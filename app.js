// ========================================
// 全局变量
// ========================================
let currentEvents = [...eventsData];
let map = null;  // Leaflet 地图实例
let markers = []; // Leaflet 标记数组
let currentEventId = null;
let currentTab = 'overview';

// ========================================
// DOM 元素
// ========================================
const timelineContainer = document.getElementById('timeline');
const modalOverlay = document.getElementById('modalOverlay');
const modalClose = document.getElementById('modalClose');
const checkboxes = document.querySelectorAll('.filter-options input[type="checkbox"]');
const weeklyFocusList = document.getElementById('weeklyFocusList');

// ========================================
// 初始化
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    initMap();
    initTimeline();
    initEventListeners();
    updateStats();
    initWeeklyFocus();
});

// ========================================
// Leaflet 地图初始化 - 类似CFR风格
// ========================================
function initMap() {
    // 创建地图实例，使用类似CFR的地图样式
    map = L.map('worldMap', {
        center: [20, 0],
        zoom: 2,
        minZoom: 1,
        maxZoom: 8,
        zoomControl: true,
        attributionControl: true,
        scrollWheelZoom: true,
        doubleClickZoom: true,
        touchZoom: true
    });

    // 添加地图图层 - 使用CartoDB Positron样式（类似CFR的简洁风格）
    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 19
    }).addTo(map);

    // 添加事件标记
    addEventMarkers();

    // 绑定地图控制按钮
    document.getElementById('zoomIn').addEventListener('click', () => map.zoomIn());
    document.getElementById('zoomOut').addEventListener('click', () => map.zoomOut());
    document.getElementById('resetView').addEventListener('click', () => map.setView([20, 0], 2));
}

// 将 x/y 百分比坐标转换为经纬度
function coordinatesToLatLng(x, y) {
    // x: 0-100% -> -180 to 180 (经度)
    // y: 0-100% -> 90 to -90 (纬度)
    const lng = (x / 100) * 360 - 180;
    const lat = 90 - (y / 100) * 180;
    return [lat, lng];
}

// 添加事件标记到地图
function addEventMarkers() {
    // 清除现有标记
    markers.forEach(m => map.removeLayer(m));
    markers = [];

    currentEvents.forEach(event => {
        const [lat, lng] = coordinatesToLatLng(event.coordinates.x, event.coordinates.y);
        const marker = createLeafletMarker(event, lat, lng);
        markers.push(marker);
    });
}

// 创建 Leaflet 标记
function createLeafletMarker(event, lat, lng) {
    const typeInfo = eventTypeMap[event.type] || { name: '其他', color: '#64748b', icon: '📍' };

    // 根据重要程度调整大小
    const sizeClass = event.importance === 'high' ? 'high' : event.importance === 'low' ? 'low' : '';

    // 创建自定义图标
    const iconHtml = `
        <div class="custom-marker">
            <div class="marker-icon ${event.type} ${sizeClass}">
                ${typeInfo.icon}
            </div>
        </div>
    `;

    const customIcon = L.divIcon({
        html: iconHtml,
        className: '',
        iconSize: event.importance === 'high' ? [32, 32] : event.importance === 'low' ? [24, 24] : [28, 28],
        iconAnchor: event.importance === 'high' ? [16, 16] : event.importance === 'low' ? [12, 12] : [14, 14]
    });

    // 创建标记
    const marker = L.marker([lat, lng], { icon: customIcon }).addTo(map);

    // 创建弹出框内容
    const popupContent = `
        <div class="map-popup">
            <div class="map-popup-title">${event.title}</div>
            <div class="map-popup-meta">
                📍 ${event.location}
                ${event.date ? `<br>📅 ${event.date}` : ''}
            </div>
            <span class="map-popup-type ${event.type}">${typeInfo.name}</span>
            <button class="map-popup-btn" onclick="openEventModal(eventsData.find(e => e.id === ${event.id}))">
                查看详情
            </button>
        </div>
    `;

    marker.bindPopup(popupContent, {
        maxWidth: 280,
        className: 'custom-popup'
    });

    // 点击标记时打开详情
    marker.on('click', function() {
        currentEventId = event.id;
    });

    return marker;
}

// 过滤并更新地图标记
function updateMapMarkers() {
    addEventMarkers();
}

// ========================================
// 时间轴初始化
// ========================================
function initTimeline() {
    // 按日期排序
    const sortedEvents = [...currentEvents]
        .filter(event => event.date)
        .sort((a, b) => new Date(a.date) - new Date(b.date));

    const today = new Date('2026-02-26');
    const futureEvents = sortedEvents.filter(event =>
        new Date(event.date) >= today
    ).slice(0, 10);

    timelineContainer.innerHTML = '';

    // 先添加地缘冲突（无日期）
    const geopoliticalEvents = currentEvents.filter(e => e.type === 'geopolitical');
    geopoliticalEvents.slice(0, 3).forEach(event => {
        const item = createTimelineItem(event, true);
        timelineContainer.appendChild(item);
    });

    // 再添加有日期的事件
    futureEvents.forEach(event => {
        const item = createTimelineItem(event, false);
        timelineContainer.appendChild(item);
    });
}

function createTimelineItem(event, isGeopolitical) {
    const item = document.createElement('div');
    item.className = `timeline-item ${event.type}`;
    item.dataset.eventId = event.id;

    let dateStr = '持续中';
    if (event.date) {
        const date = new Date(event.date);
        dateStr = formatEventDate(date);
    }

    item.innerHTML = `
        <div class="timeline-date">${dateStr}</div>
        <div class="timeline-content">
            <div class="timeline-title">${event.title}</div>
            <div class="timeline-location">📍 ${event.location}</div>
            <span class="timeline-importance ${event.importance}">
                ${importanceMap[event.importance].name}影响
            </span>
        </div>
    `;

    item.addEventListener('click', () => openEventModal(event));

    return item;
}

function formatEventDate(date) {
    const months = ['1月', '2月', '3月', '4月', '5月', '6月',
                   '7月', '8月', '9月', '10月', '11月', '12月'];
    return `${date.getFullYear()}年${months[date.getMonth()]}${date.getDate()}日`;
}

// ========================================
// 未来一周关注模块
// ========================================
function initWeeklyFocus() {
    const today = new Date('2026-02-26');
    const oneWeekLater = new Date(today);
    oneWeekLater.setDate(today.getDate() + 7);

    const weeklyEvents = currentEvents.filter(event => {
        if (!event.date) return false;
        const eventDate = new Date(event.date);
        return eventDate >= today && eventDate <= oneWeekLater;
    }).sort((a, b) => new Date(a.date) - new Date(b.date));

    weeklyFocusList.innerHTML = '';

    // 添加地缘冲突到关注列表
    const geopoliticalEvents = currentEvents.filter(e => e.type === 'geopolitical' && e.importance === 'high');
    geopoliticalEvents.slice(0, 2).forEach(event => {
        const item = createFocusItem(event, true);
        weeklyFocusList.appendChild(item);
    });

    weeklyEvents.slice(0, 5).forEach(event => {
        const item = createFocusItem(event, false);
        weeklyFocusList.appendChild(item);
    });

    if (weeklyFocusList.children.length === 0) {
        weeklyFocusList.innerHTML = '<div class="focus-item"><span class="focus-text">暂无重点关注事件</span></div>';
    }
}

function createFocusItem(event, isGeopolitical) {
    const item = document.createElement('div');
    item.className = `focus-item ${event.importance} ${isGeopolitical ? 'geopolitical' : ''}`;

    let dateStr = '关注';
    if (event.date) {
        const date = new Date(event.date);
        dateStr = `${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getDate().toString().padStart(2, '0')}`;
    }

    item.innerHTML = `
        <div class="focus-date">${dateStr}</div>
        <div class="focus-content">
            <span class="focus-tag ${event.type}">${eventTypeMap[event.type].name}</span>
            <span class="focus-text">${event.title}</span>
        </div>
    `;

    item.addEventListener('click', () => openEventModal(event));

    return item;
}

// ========================================
// 弹窗功能
// ========================================
function openEventModal(event) {
    currentEventId = event.id;
    currentTab = 'overview';

    // 填充基本信息
    const eventTypeEl = document.getElementById('modalEventType');
    eventTypeEl.textContent = eventTypeMap[event.type].name;
    eventTypeEl.className = `modal-event-type ${event.type}`;

    document.getElementById('modalTitle').textContent = event.title;
    document.getElementById('modalLocation').textContent = event.location;

    if (event.date) {
        const dateStr = formatEventDate(new Date(event.date));
        const endDateStr = event.endDate ? ` - ${formatEventDate(new Date(event.endDate))}` : '';
        document.getElementById('modalDate').textContent = dateStr + endDateStr;
    } else {
        document.getElementById('modalDate').textContent = '持续发展中';
    }

    document.getElementById('modalImportance').textContent =
        `${importanceMap[event.importance].name}影响`;

    // 概述标签页
    document.getElementById('modalSummary').textContent = event.summary;

    let impactHtml = '';
    for (const [market, data] of Object.entries(event.impact)) {
        impactHtml += `
            <div class="impact-item">
                <span class="impact-label">${market}</span>
                <span class="impact-direction ${data.direction}">${data.note}</span>
            </div>
        `;
    }
    document.getElementById('modalImpact').innerHTML = impactHtml;

    // 时间线标签页
    let historyHtml = '';
    if (event.history && event.history.length > 0) {
        event.history.forEach(item => {
            historyHtml += `
                <div class="history-item">
                    <span class="history-date">${item.date}</span>
                    <span class="history-content">${item.content}</span>
                </div>
            `;
        });
    } else {
        historyHtml = '<p class="empty-hint">暂无历史记录</p>';
    }
    document.getElementById('modalHistory').innerHTML = historyHtml;

    // 后续关注点
    let futureHtml = '';
    if (event.futureKeyDates && event.futureKeyDates.length > 0) {
        event.futureKeyDates.forEach(item => {
            const date = new Date(item.date);
            const dateStr = `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
            futureHtml += `
                <div class="future-date-item">
                    <span class="date">${dateStr}</span>
                    <span class="event">${item.event}</span>
                </div>
            `;
        });
    } else {
        futureHtml = '<p class="empty-hint">暂无后续关注点</p>';
    }
    document.getElementById('modalFutureDates').innerHTML = futureHtml;

    // 前瞻标签页
    if (event.outlook) {
        document.getElementById('modalOutlookExpectation').textContent = event.outlook.rateExpectation;

        let keyPointsHtml = '';
        if (event.outlook.keyPoints) {
            event.outlook.keyPoints.forEach(point => {
                keyPointsHtml += `<li>${point}</li>`;
            });
        }
        document.getElementById('modalKeyPoints').innerHTML = keyPointsHtml;
    }

    // 地缘冲突专属模块
    const geoSection = document.getElementById('geopoliticalSection');
    if (event.type === 'geopolitical') {
        geoSection.style.display = 'block';

        const statusEl = document.getElementById('geoStatus');
        if (event.status && geoStatusMap[event.status]) {
            statusEl.textContent = geoStatusMap[event.status].name;
            statusEl.className = `status-value ${geoStatusMap[event.status].class}`;
        }

        if (event.keyFactors) {
            let factorsHtml = '';
            event.keyFactors.forEach(factor => {
                factorsHtml += `<li>${factor}</li>`;
            });
            document.getElementById('geoKeyFactors').innerHTML = factorsHtml;
        }

        if (event.marketImpact) {
            let marketHtml = '';
            event.marketImpact.forEach(impact => {
                marketHtml += `<li>${impact}</li>`;
            });
            document.getElementById('geoMarketImpact').innerHTML = marketHtml;
        }
    } else {
        geoSection.style.display = 'none';
    }

    // 新闻标签页
    let newsHtml = '';
    if (event.newsLinks && event.newsLinks.length > 0) {
        event.newsLinks.forEach(link => {
            newsHtml += `<a href="${link.url}" target="_blank" class="news-link">${link.title}</a>`;
        });
    } else {
        newsHtml = '<p class="empty-hint">暂无新闻链接</p>';
    }
    document.getElementById('modalNewsLinks').innerHTML = newsHtml;

    // 其他信息标签页
    if (event.background) {
        document.getElementById('modalBackground').innerHTML = `<p>${event.background}</p>`;
    } else {
        document.getElementById('modalBackground').innerHTML = '<p class="empty-hint">暂无背景信息</p>';
    }

    // 重置到概述标签页
    switchTab('overview');

    // 显示弹窗
    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeEventModal() {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
    currentEventId = null;
}

// ========================================
// 标签页切换
// ========================================
function switchTab(tabName) {
    currentTab = tabName;

    // 更新标签按钮状态
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.tab === tabName) {
            btn.classList.add('active');
        }
    });

    // 更新内容显示
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
    });
    document.getElementById(`tab-${tabName}`).classList.add('active');
}

// ========================================
// 筛选功能
// ========================================
function filterEvents() {
    const selectedTypes = [];
    checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
            selectedTypes.push(checkbox.dataset.type);
        }
    });

    currentEvents = eventsData.filter(event =>
        selectedTypes.includes(event.type)
    );

    updateMapMarkers();
    initTimeline();
    updateStats();
    initWeeklyFocus();
}

// ========================================
// 统计更新
// ========================================
function updateStats() {
    const today = new Date('2026-02-26');
    const oneWeekLater = new Date(today);
    oneWeekLater.setDate(today.getDate() + 7);

    const oneMonthLater = new Date(today);
    oneMonthLater.setMonth(today.getMonth() + 1);

    const thisMonthEvents = currentEvents.filter(event => {
        if (!event.date) return false;
        const eventDate = new Date(event.date);
        return eventDate >= today && eventDate <= oneMonthLater;
    });

    const highImpactEvents = currentEvents.filter(event =>
        event.importance === 'high'
    );

    const thisWeekEvents = currentEvents.filter(event => {
        if (!event.date) return false;
        const eventDate = new Date(event.date);
        return eventDate >= today && eventDate <= oneWeekLater;
    });

    document.getElementById('monthStat').textContent = thisMonthEvents.length;
    document.getElementById('highStat').textContent = highImpactEvents.length;
    document.getElementById('weekStat').textContent = thisWeekEvents.length;
}

// ========================================
// 地图控制
// ========================================
function initMapControls() {
    const worldMap = document.getElementById('worldMap');

    document.getElementById('zoomIn').addEventListener('click', () => {
        mapScale = Math.min(mapScale * 1.2, 3);
        worldMap.style.transform = `scale(${mapScale})`;
    });

    document.getElementById('zoomOut').addEventListener('click', () => {
        mapScale = Math.max(mapScale / 1.2, 0.5);
        worldMap.style.transform = `scale(${mapScale})`;
    });

    document.getElementById('resetView').addEventListener('click', () => {
        mapScale = 1;
        worldMap.style.transform = `scale(1)`;
    });
}

// ========================================
// 事件监听器
// ========================================
function initEventListeners() {
    // 弹窗关闭
    modalClose.addEventListener('click', closeEventModal);
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
            closeEventModal();
        }
    });

    // ESC键关闭弹窗
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
            closeEventModal();
        }
    });

    // 筛选复选框
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', filterEvents);
    });

    // 地图控制
    initMapControls();

    // 导航链接
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        });
    });

    // 标签页切换
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            switchTab(btn.dataset.tab);
        });
    });

    // 添加到关注按钮
    document.getElementById('btnAddWatch')?.addEventListener('click', () => {
        if (currentEventId) {
            addToWatchlist(currentEventId);
        }
    });

    // 导出按钮
    document.getElementById('btnExport')?.addEventListener('click', () => {
        if (currentEventId) {
            exportToPDF(currentEventId);
        }
    });

    // 重要程度筛选
    document.querySelectorAll('.importance-dot').forEach(dot => {
        dot.addEventListener('click', () => {
            dot.classList.toggle('active');
            // 可以添加更复杂的筛选逻辑
        });
    });
}

// ========================================
// 工具函数
// ========================================
window.addEventListener('resize', debounce(() => {
    // Leaflet 地图会自动处理 resize
    if (map) {
        map.invalidateSize();
    }
}, 250));

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

document.querySelectorAll('.timeline-panel, .filter-panel').forEach(panel => {
    panel.style.scrollBehavior = 'smooth';
});

// ========================================
// 搜索功能（预留）
// ========================================
function searchEvents(query) {
    const searchTerm = query.toLowerCase();
    return eventsData.filter(event =>
        event.title.toLowerCase().includes(searchTerm) ||
        event.location.toLowerCase().includes(searchTerm) ||
        event.summary.toLowerCase().includes(searchTerm)
    );
}

// ========================================
// 导出功能
// ========================================
function exportToPDF(eventId) {
    const event = eventsData.find(e => e.id === eventId);
    if (event) {
        alert(`正在生成"${event.title}"事件报告...`);
    }
}

function addToWatchlist(eventId) {
    const event = eventsData.find(e => e.id === eventId);
    if (event) {
        let watchlist = JSON.parse(localStorage.getItem('eventWatchlist') || '[]');
        if (!watchlist.includes(eventId)) {
            watchlist.push(eventId);
            localStorage.setItem('eventWatchlist', JSON.stringify(watchlist));
            alert(`已将"${event.title}"添加到关注列表`);
        } else {
            alert('该事件已在关注列表中');
        }
    }
}
