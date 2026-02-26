// ========================================
// 全局变量
// ========================================
let currentEvents = [...eventsData];
let mapScale = 1;
let currentEventId = null;
let currentTab = 'overview';

// ========================================
// DOM 元素
// ========================================
const eventMarkersContainer = document.getElementById('eventMarkers');
const timelineContainer = document.getElementById('timeline');
const modalOverlay = document.getElementById('modalOverlay');
const modalClose = document.getElementById('modalClose');
const checkboxes = document.querySelectorAll('.filter-options input[type="checkbox"]');
const weeklyFocusList = document.getElementById('weeklyFocusList');
const countryModulesContainer = document.getElementById('countryModules');

// ========================================
// 初始化
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    initEventMarkers();
    initTimeline();
    initEventListeners();
    updateStats();
    initWeeklyFocus();
    initCountryModules();
});

// ========================================
// 事件标记初始化
// ========================================
function initEventMarkers() {
    eventMarkersContainer.innerHTML = '';

    currentEvents.forEach(event => {
        const marker = createEventMarker(event);
        eventMarkersContainer.appendChild(marker);
    });
}

function createEventMarker(event) {
    const marker = document.createElement('div');
    marker.className = 'event-marker';
    marker.style.left = `${event.coordinates.x}%`;
    marker.style.top = `${event.coordinates.y}%`;
    marker.dataset.eventId = event.id;

    const dot = document.createElement('div');
    dot.className = `marker-dot ${event.type} importance-${event.importance}`;
    dot.style.color = eventTypeMap[event.type].color;

    const label = document.createElement('div');
    label.className = 'event-label';
    label.textContent = event.title;

    marker.appendChild(dot);
    marker.appendChild(label);

    marker.addEventListener('click', () => openEventModal(event));

    return marker;
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
// 国家事件小模块
// ========================================
function initCountryModules() {
    countryModulesContainer.innerHTML = '';

    const countries = ['美国', '中国', '欧元区', '日本', '俄罗斯', '乌克兰'];

    countries.forEach(country => {
        const countryEvents = currentEvents.filter(e =>
            e.country === country || e.country.includes(country) ||
            (country === '欧元区' && (e.country === '德国' || e.country === '欧元区' || e.country === '法国'))
        );

        if (countryEvents.length > 0) {
            const sorted = countryEvents.sort((a, b) => {
                const importanceOrder = { high: 0, medium: 1, low: 2 };
                return importanceOrder[a.importance] - importanceOrder[b.importance];
            });

            const topEvent = sorted[0];
            const module = createCountryModule(country, topEvent);
            countryModulesContainer.appendChild(module);
        }
    });
}

function createCountryModule(country, event) {
    const module = document.createElement('div');
    module.className = `country-module ${event.type === 'geopolitical' ? 'geopolitical' : ''}`;

    const coords = countryCoordinates[country] || event.coordinates;
    module.style.top = `${coords.y}%`;
    module.style.left = `${coords.x}%`;

    const flagMap = {
        '美国': '🇺🇸',
        '中国': '🇨🇳',
        '欧元区': '🇪🇺',
        '日本': '🇯🇵',
        '俄罗斯': '🇷🇺',
        '乌克兰': '🇺🇦'
    };

    module.innerHTML = `
        <div class="country-name">${flagMap[country] || ''} ${country}</div>
        <div class="country-event">
            <span class="event-dot ${event.type}"></span>
            <span class="event-name">${event.title.length > 10 ? event.title.substring(0, 10) + '...' : event.title}</span>
        </div>
    `;

    module.addEventListener('click', () => openEventModal(event));

    return module;
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

    initEventMarkers();
    initTimeline();
    updateStats();
    initWeeklyFocus();
    initCountryModules();
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
    initEventMarkers();
    initCountryModules();
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
