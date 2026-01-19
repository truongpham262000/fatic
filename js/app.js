// SINGLE PAGE APPLICATION LOGIC

// Initialize Application
window.initApp = function() {
    // 1. Initial Renders
    renderTopBar();
    renderNavigation();
    renderFooter();
    
    // 2. Initial Routing
    handleRouting(); // Decide which section to show based on URL or default to home

    // 3. Global Listeners
    bindMobileMenuListeners();
    bindNavbarScrollListener();
    checkCelebrations();
    initScrollAnimations();
    
    // 4. Bind History State (Back button support)
    window.onpopstate = handleRouting;
};

document.addEventListener('DOMContentLoaded', () => {
    initApp();
});

// --- ROUTING & NAVIGATION ---

function handleRouting() {
    const params = new URLSearchParams(window.location.search);
    const section = params.get('page') || 'home';
    const id = params.get('id');
    const category = params.get('category'); // support linking to category

    // Hide all sections
    document.querySelectorAll('.section-view').forEach(el => el.classList.remove('active'));
    
    // Show target section
    const target = document.getElementById(`section-${section}`);
    if(target) {
        target.classList.add('active');
        window.scrollTo(0, 0);
        
        // Trigger specific logic per page
        if(section === 'services') renderServicesContent(category);
        else if(section === 'projects') renderProjectsContent(category);
        else if(section === 'news') renderNewsContent(category);
        else if(section === 'detail') renderDetailContent(params.get('type'), id);
        else if(section === 'home') renderHomeContent(); // Refresh home widgets
    } else {
        // Fallback to home
        document.getElementById('section-home').classList.add('active');
        renderHomeContent();
    }
    
    updateActiveNavLink(section);
}

// Function to switch page without reload
window.switchPage = function(pageName, params = {}) {
    const url = new URL(window.location);
    url.searchParams.set('page', pageName);
    
    // Clear other params unless specified
    url.searchParams.delete('id');
    url.searchParams.delete('type');
    url.searchParams.delete('category');

    for (const [key, value] of Object.entries(params)) {
        url.searchParams.set(key, value);
    }
    
    window.history.pushState({}, '', url);
    handleRouting();
}

// --- CONTENT RENDERERS ---

function renderHomeContent() {
    // Services Widget
    const sContainer = document.getElementById('home-services');
    if (sContainer) {
        sContainer.innerHTML = "";
        faticData.services.slice(0, 9).forEach(item => {
             sContainer.innerHTML += `
                <div class="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-shadow border border-gray-100 flex flex-col items-center text-center cursor-pointer group" onclick="switchPage('detail', {type: 'service', id: '${item.id}'})">
                    <div class="w-16 h-16 bg-white rounded-full flex items-center justify-center text-secondary text-2xl mb-4 shadow-sm group-hover:bg-secondary group-hover:text-white transition-colors">
                        <i class="${item.icon}"></i>
                    </div>
                    <h3 class="text-xl font-bold text-primary mb-2 group-hover:text-secondary transition-colors">${item.title}</h3>
                    <p class="text-gray-500 text-sm line-clamp-2">${item.shortDesc}</p>
                </div>
             `;
        });
    }
    // Projects Widget
    const pContainer = document.getElementById('home-projects');
    if (pContainer) {
         pContainer.innerHTML = "";
         faticData.projects.slice(0, 2).forEach(item => {
             pContainer.innerHTML += `
                <div class="relative rounded-xl overflow-hidden h-64 group cursor-pointer" onclick="switchPage('detail', {type: 'project', id: '${item.id}'})">
                    <img src="${item.image}" loading="lazy" class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110">
                    <div class="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <span class="text-white font-bold border border-white px-4 py-2 rounded-full uppercase text-xs hover:bg-white hover:text-black transition-colors">${item.title}</span>
                    </div>
                </div>
             `;
         })
    }
    // News Widget
    const nContainer = document.getElementById('home-news');
    if (nContainer) {
        nContainer.innerHTML = "";
        faticData.news.slice(0, 3).forEach(item => {
            nContainer.innerHTML += `
                <article class="bg-white rounded-xl overflow-hidden shadow hover:shadow-xl transition-all border border-gray-100 group cursor-pointer flex flex-col" onclick="switchPage('detail', {type: 'news', id: '${item.id}'})">
                    <div class="h-48 overflow-hidden relative shrink-0">
                        <img src="${item.image}" loading="lazy" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700">
                        <div class="absolute top-0 right-0 bg-secondary text-white text-xs font-bold px-3 py-1 rounded-bl-lg">${item.date}</div>
                    </div>
                    <div class="p-5 flex-grow flex flex-col">
                        <div class="text-xs font-bold text-gray-400 uppercase mb-2">${item.category}</div>
                        <h3 class="text-lg font-bold text-primary mb-2 group-hover:text-secondary line-clamp-2 transition-colors">${item.title}</h3>
                        <p class="text-gray-500 text-sm line-clamp-2">${item.content.replace(/<[^>]*>/g, '').substring(0, 80)}...</p>
                    </div>
                </article>
            `;
        });
    }
    setTimeout(initScrollAnimations, 100);
}

function renderServicesContent(categoryFilter = null) {
    const container = document.getElementById('services-list');
    if(!container) return;
    container.innerHTML = "";

    let items = faticData.services;
    const headerTitle = document.getElementById('service-header-title');

    // UI Updates for Active Filter
    document.querySelectorAll('.active-filter').forEach(b => {
        b.classList.remove('bg-secondary', 'text-white');
        b.classList.add('bg-white', 'text-gray-600');
    });
    const currentBtn = document.querySelector(`button[data-filter="${categoryFilter || 'ALL'}"]`);
    if(currentBtn) {
        currentBtn.classList.remove('bg-white', 'text-gray-600');
        currentBtn.classList.add('bg-secondary', 'text-white');
    }

    if (categoryFilter && categoryFilter !== 'ALL') {
        items = items.filter(i => i.category === categoryFilter);
        if(headerTitle) headerTitle.innerText = `Dịch Vụ: ${getCategoryName(categoryFilter)}`;
    } else {
        if(headerTitle) headerTitle.innerText = "Tất Cả Dịch Vụ";
    }

    items.forEach((item, index) => {
        const card = document.createElement('div');
        card.className = `reveal bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group border border-gray-100 flex flex-col`;
        card.style.transitionDelay = `${Math.min(index * 50, 500)}ms`; // faster cascade
        
        card.innerHTML = `
            <div class="h-56 overflow-hidden relative cursor-pointer" onclick="switchPage('detail', {type: 'service', id: '${item.id}'})">
                <img src="${item.image}" loading="lazy" alt="${item.title}" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110">
                <div class="absolute inset-0 bg-primary/20 group-hover:bg-transparent transition-colors"></div>
                <div class="absolute top-4 right-4 bg-white/90 px-3 py-1 rounded-full text-xs font-bold text-secondary shadow-sm">${getCategoryName(item.category)}</div>
            </div>
            <div class="p-6 flex-1 flex flex-col">
                <h3 class="text-xl font-bold text-primary mb-3 font-serif hover:text-secondary transition-colors cursor-pointer" onclick="switchPage('detail', {type: 'service', id: '${item.id}'})">${item.title}</h3>
                <p class="text-gray-600 mb-4 line-clamp-3 text-sm flex-grow">${item.shortDesc}</p>
                <button onclick="switchPage('detail', {type: 'service', id: '${item.id}'})" class="w-full py-2 border border-primary text-primary rounded hover:bg-primary hover:text-white transition-colors font-bold text-sm uppercase">Xem Chi Tiết</button>
            </div>
        `;
        container.appendChild(card);
        // setTimeout(() => card.classList.add('active'), 100); // Trigger anim -> REMOVED
    });
    setTimeout(initScrollAnimations, 100);
}

// Exposed Function for Buttons
window.filterServices = function(cat) {
    if(cat === 'ALL') switchPage('services');
    else switchPage('services', {category: cat});
}

function renderProjectsContent(categoryFilter = null) {
    const container = document.getElementById('projects-list');
    if(!container) return;
    container.innerHTML = "";
    
    let items = faticData.projects;
    
    // reset selection UI
     document.querySelectorAll('.active-filter-proj').forEach(b => {
        b.classList.remove('bg-secondary', 'text-white');
        b.classList.add('bg-white', 'text-gray-600');
    });
    const currentBtn = document.querySelector(`button[data-filter="${categoryFilter || 'ALL'}"]`);
    if(currentBtn) {
        currentBtn.classList.remove('bg-white', 'text-gray-600');
        currentBtn.classList.add('bg-secondary', 'text-white');
    }

    if (categoryFilter && categoryFilter !== 'ALL') items = items.filter(i => i.category === categoryFilter);

    items.forEach((item, index) => {
        const card = document.createElement('div');
        card.className = "group relative overflow-hidden rounded-2xl shadow-xl h-[400px] cursor-pointer reveal active"; // Force active for simplicity in update
        card.onclick = () => switchPage('detail', {type: 'project', id: item.id});
        
        card.innerHTML = `
            <img src="${item.image}" loading="lazy" class="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110">
            <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-8">
                 <div class="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <span class="text-secondary text-xs font-bold uppercase tracking-wider mb-2 block">${getCategoryName(item.category)}</span>
                    <h3 class="text-2xl font-bold text-white mb-2 font-serif">${item.title}</h3>
                    <p class="text-gray-300 text-xs line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity">${item.description}</p>
                 </div>
            </div>
        `;
        container.appendChild(card);
    });
    setTimeout(initScrollAnimations, 100);
}
window.filterProjects = function(cat) {
    if(cat === 'ALL') switchPage('projects');
    else switchPage('projects', {category: cat});
}

function renderNewsContent(categoryFilter = null) {
    const container = document.getElementById('news-list');
    if(!container) return;
    container.innerHTML = "";
    
    let items = faticData.news;
    if (categoryFilter && categoryFilter !== 'ALL') {
        items = faticData.news.filter(i => i.category === categoryFilter);
    }
    
    if(items.length === 0) {
        container.innerHTML = `<div class="col-span-3 text-center text-gray-500 py-10">Không có tin tức nào thuộc danh mục này.</div>`;
        return;
    }

    items.forEach((item, index) => {
        container.innerHTML += `
            <article class="bg-white rounded-xl overflow-hidden shadow hover:shadow-xl transition-all border border-gray-100 group cursor-pointer reveal active" onclick="switchPage('detail', {type: 'news', id: '${item.id}'})">
                <div class="h-48 overflow-hidden relative">
                    <img src="${item.image}" loading="lazy" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700">
                    <div class="absolute top-0 right-0 bg-secondary text-white text-xs font-bold px-3 py-1 rounded-bl-lg">${item.date}</div>
                </div>
                <div class="p-6">
                    <div class="text-xs font-bold text-gray-400 uppercase mb-2">${item.category}</div>
                    <h3 class="text-lg font-bold text-primary mb-3 group-hover:text-secondary line-clamp-2">${item.title}</h3>
                    <p class="text-gray-500 text-sm line-clamp-3">${item.content.replace(/<[^>]*>/g, '').substring(0, 100)}...</p>
                </div>
            </article>
        `;
    });
    setTimeout(initScrollAnimations, 100);
}

function renderDetailContent(type, id) {
    const container = document.getElementById('detail-content');
    const titleEl = document.getElementById('detail-title');
    if(!container) return;
    
    let item;
    if (type === 'service') item = faticData.services.find(i => i.id === id);
    else if (type === 'project') item = faticData.projects.find(i => i.id === id);
    else if (type === 'news') item = faticData.news.find(i => i.id === id);

    if (!item) {
        container.innerHTML = "<p class='text-center'>Không tìm thấy nội dung.</p>";
        return;
    }

    titleEl.innerText = item.title;
    
    let galleryHTML = '';
    if(item.gallery && item.gallery.length > 0) {
        galleryHTML = `<div class="grid grid-cols-3 gap-4 my-8">
            ${item.gallery.map(img => `<img src="${img}" class="rounded-lg shadow-sm hover:opacity-90 transition-opacity cursor-pointer h-32 w-full object-cover">`).join('')}
        </div>`;
    }

    container.innerHTML = `
        <div class="prose max-w-none text-gray-700 leading-relaxed space-y-4">
            <div class="float-right ml-6 mb-6 w-full md:w-1/3">
                 <img src="${item.image}" class="rounded-xl shadow-lg w-full">
            </div>
            <p class="font-bold text-xl text-primary">${item.shortDesc || item.description || ''}</p>
            <div>${item.fullDesc || item.content || item.fullContent || ''}</div>
            ${galleryHTML}
            <div class="clear-both"></div>
        </div>
    `;
    
    // Re-trigger scroll to top done in handleRouting
}


// --- COMPONENT HELPERS ---
function renderTopBar() {
     if(!document.getElementById('top-bar')) {
        const topBarHTML = `
        <div id="top-bar" class="bg-gray-900 text-white text-xs py-2 hidden md:block border-b border-gray-800 transition-all">
            <div class="container mx-auto px-6 flex justify-between items-center">
                <div class="flex items-center space-x-6">
                    <span class="flex items-center gap-2"><i class="fas fa-phone-alt text-secondary"></i> (+84) 24 3999 8888</span>
                </div>
                <div class="flex items-center space-x-4">
                     <a href="#" class="hover:text-secondary"><i class="fab fa-facebook-f"></i></a>
                </div>
            </div>
        </div>`;
        const wrap = document.getElementById('navbar-wrapper');
        if(wrap) wrap.insertAdjacentHTML('afterbegin', topBarHTML);
     }
}

function renderFooter() {
    const footer = document.getElementById('main-footer');
    if(footer) footer.innerHTML = `
        <div class="bg-gray-900 border-t border-gray-800 relative z-20">
            <!-- Background Decoration -->
            <div class="absolute inset-0 bg-[url('images/hero_bg.png')] opacity-5 bg-cover bg-center pointer-events-none"></div>

            <div class="container mx-auto px-6 pt-20 pb-10 relative z-10">
                 <div class="grid lg:grid-cols-4 md:grid-cols-2 gap-12 lg:gap-8 mb-16">
                    <!-- Brand Column -->
                    <div class="lg:col-span-1">
                        <a href="#" onclick="switchPage('home'); return false;" class="inline-block mb-6 group">
                             <div class="bg-white p-4 rounded-xl shadow-2xl inline-block group-hover:scale-105 transition-transform duration-300">
                                <img src="images/logo_new.png" class="h-24 w-auto object-contain" alt="FATIC Logo Large">
                             </div>
                        </a>
                        <p class="text-gray-400 text-sm leading-relaxed mb-6">
                            FATIC - Đơn vị tiên phong trong lĩnh vực Quản lý vận hành & Bảo trì kỹ thuật. Chúng tôi kiến tạo giá trị bền vững cho mọi công trình bằng sự Tận Tâm và Chuyên Nghiệp.
                        </p>
                        <div class="flex space-x-4">
                            <a href="#" class="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-secondary hover:text-white transition-all transform hover:-translate-y-1"><i class="fab fa-facebook-f"></i></a>
                            <a href="#" class="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-secondary hover:text-white transition-all transform hover:-translate-y-1"><i class="fab fa-linkedin-in"></i></a>
                            <a href="#" class="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-secondary hover:text-white transition-all transform hover:-translate-y-1"><i class="fab fa-youtube"></i></a>
                        </div>
                    </div>

                    <!-- Quick Links -->
                    <div class="lg:col-span-1 pl-4">
                        <h4 class="text-white font-bold text-lg mb-8 relative inline-block">
                            Liên Kết Nhanh
                            <span class="absolute -bottom-2 left-0 w-12 h-1 bg-secondary rounded-full"></span>
                        </h4>
                        <ul class="space-y-4 text-gray-400 text-sm">
                            <li><a href="#" onclick="switchPage('about'); return false;" class="hover:text-secondary flex items-center gap-2 transition-colors"><i class="fas fa-angle-right text-xs"></i> Về Chúng Tôi</a></li>
                            <li><a href="#" onclick="switchPage('services'); return false;" class="hover:text-secondary flex items-center gap-2 transition-colors"><i class="fas fa-angle-right text-xs"></i> Dịch Vụ</a></li>
                            <li><a href="#" onclick="switchPage('projects'); return false;" class="hover:text-secondary flex items-center gap-2 transition-colors"><i class="fas fa-angle-right text-xs"></i> Dự Án Tiêu Biểu</a></li>
                            <li><a href="#" onclick="switchPage('news'); return false;" class="hover:text-secondary flex items-center gap-2 transition-colors"><i class="fas fa-angle-right text-xs"></i> Tin Tức & Sự Kiện</a></li>
                        </ul>
                    </div>

                    <!-- Services -->
                    <div class="lg:col-span-1">
                         <h4 class="text-white font-bold text-lg mb-8 relative inline-block">
                            Dịch Vụ Chính
                            <span class="absolute -bottom-2 left-0 w-12 h-1 bg-secondary rounded-full"></span>
                        </h4>
                        <ul class="space-y-4 text-gray-400 text-sm">
                            <li><a href="#" onclick="switchPage('services',{category:'QLTN'}); return false;" class="hover:text-secondary flex items-center gap-2 transition-colors"><i class="fas fa-building text-xs"></i> Quản Lý Tòa Nhà</a></li>
                            <li><a href="#" onclick="switchPage('services',{category:'BTKT'}); return false;" class="hover:text-secondary flex items-center gap-2 transition-colors"><i class="fas fa-cogs text-xs"></i> Bảo Trì Kỹ Thuật</a></li>
                            <li><a href="#" onclick="switchPage('services',{category:'CN'}); return false;" class="hover:text-secondary flex items-center gap-2 transition-colors"><i class="fas fa-microchip text-xs"></i> Giải Pháp Smarthome</a></li>
                        </ul>
                    </div>

                    <!-- Contact -->
                    <div class="lg:col-span-1">
                        <h4 class="text-white font-bold text-lg mb-8 relative inline-block">
                            Thông Tin Liên Hệ
                            <span class="absolute -bottom-2 left-0 w-12 h-1 bg-secondary rounded-full"></span>
                        </h4>
                         <ul class="space-y-6 text-gray-400 text-sm">
                            <li class="flex items-start gap-4">
                                <div class="w-8 h-8 rounded bg-white/5 flex items-center justify-center text-secondary shrink-0"><i class="fas fa-map-marker-alt"></i></div>
                                <span>Số 88 Láng Hạ, Đống Đa, TP. Hà Nội<br><span class="text-xs text-gray-500">Tòa nhà FATIC Tower, Tầng 18</span></span>
                            </li>
                            <li class="flex items-start gap-4">
                                <div class="w-8 h-8 rounded bg-white/5 flex items-center justify-center text-secondary shrink-0"><i class="fas fa-phone-alt"></i></div>
                                <span class="text-white font-bold text-lg">(+84) 24 3999 8888</span>
                            </li>
                            <li class="flex items-start gap-4">
                                <div class="w-8 h-8 rounded bg-white/5 flex items-center justify-center text-secondary shrink-0"><i class="fas fa-envelope"></i></div>
                                <span>contact@fatic.com.vn</span>
                            </li>
                        </ul>
                    </div>
                 </div>

                 <!-- Copyright -->
                 <div class="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-600">
                    <div class="mb-4 md:mb-0">&copy; 2026 FATIC. Bản quyền thuộc về Công ty CP Quản lý & Khai thác Tòa nhà FATIC.</div>
                    <div class="flex space-x-6">
                        <a href="#" class="hover:text-secondary transition-colors">Điều khoản sử dụng</a>
                        <a href="#" class="hover:text-secondary transition-colors">Chính sách bảo mật</a>
                        <a href="#" class="hover:text-secondary transition-colors">Sitemap</a>
                    </div>
                 </div>
            </div>
        </div>
    `;
}

function renderNavigation() {
    const container = document.querySelector('#navbar .hidden.lg\\:flex');
    if (container && faticData.navigation) {
        let html = '';
        faticData.navigation.forEach(item => {
            if (item.type === 'dropdown') {
                // Determine category filter if link is services.html?category=XYZ
                // We extract the base page and params
                 html += `
                    <div class="relative group h-full flex items-center">
                        <button class="flex items-center hover:text-secondary py-4 uppercase tracking-wider transition-colors font-bold">
                            ${item.name} <i class="fas fa-chevron-down ml-1 text-xs"></i>
                        </button>
                        <div class="absolute left-0 top-full w-56 bg-white shadow-xl rounded-lg py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 z-50">
                             ${item.items.map(sub => {
                                 // Parse link
                                 let clickAction = "";
                                 if(sub.link.includes('category=')) {
                                     const parts = sub.link.split('?');
                                     const page = parts[0].replace('.html', '');
                                     const p = new URLSearchParams(parts[1]);
                                     clickAction = `switchPage('${page}', {category: '${p.get('category')}'})`;
                                 } else {
                                     clickAction = `switchPage('${sub.link.replace('.html','')}')`;
                                 }
                                 return `<a href="#" onclick="${clickAction}; return false;" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-secondary">${sub.name}</a>`
                             }).join('')}
                        </div>
                    </div>`;
            } else if (item.link === 'contact.html') {
                 html += `<button onclick="switchPage('contact')" class="px-5 py-2 bg-primary text-white rounded-full hover:bg-secondary transition-colors uppercase text-xs font-bold shadow-lg">Liên Hệ</button>`;
            } else {
                html += `<button onclick="switchPage('${item.link.replace('.html','')}')" class="hover:text-secondary uppercase tracking-wider transition-colors font-bold">${item.name}</button>`;
            }
        });
        container.innerHTML = html;
        container.classList.add('gap-8');
    }
    
    // render mobile similarly... (simplified for this update)
     const mobileNavContainer = document.querySelector('#mobile-menu .flex.flex-col');
    if (mobileNavContainer) {
        mobileNavContainer.innerHTML = faticData.navigation.map(item => {
             return `<button onclick="switchPage('${item.link.replace('.html','')}')" class="text-left py-2 border-b border-gray-100 font-bold text-gray-700">${item.name}</button>`;
        }).join('');
    }
}

function updateActiveNavLink(currentSection) {
    const navLinks = document.querySelectorAll('#navbar button, #navbar a');
    navLinks.forEach(l => l.classList.remove('text-secondary'));
    // Simple loose match
    // ...
}

function bindNavbarScrollListener() {
    const navbar = document.getElementById('navbar');
    if (navbar) {
        window.onscroll = () => {
             if(window.scrollY > 20) {
                navbar.classList.add('py-2', 'bg-white/95', 'shadow-md');
                navbar.classList.remove('py-4');
            } else {
                navbar.classList.remove('py-2', 'bg-white/95', 'shadow-md');
                navbar.classList.add('py-4');
            }
        };
    }
}

function bindMobileMenuListeners() {
     const mobileBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    if(mobileBtn) {
        mobileBtn.onclick = () => {
            mobileMenu.classList.toggle('open');
        }
    }
}

// --- HISTORY TIMELINE INTERACTION (ABOUT PAGE) ---
window.switchHistory = function(year) {
    // 1. Update Buttons
    document.querySelectorAll('.history-btn').forEach(btn => {
        if(btn.dataset.year === year) {
            btn.classList.add('bg-secondary', 'text-white', 'scale-105', 'shadow-lg');
            btn.classList.remove('bg-gray-100', 'text-gray-500', 'hover:bg-gray-200');
        } else {
            btn.classList.remove('bg-secondary', 'text-white', 'scale-105', 'shadow-lg');
            btn.classList.add('bg-gray-100', 'text-gray-500', 'hover:bg-gray-200');
        }
    });

    // 2. Update Content with Animation
    document.querySelectorAll('.history-content').forEach(content => {
        content.classList.add('hidden', 'opacity-0', 'translate-y-4'); // Hide all
        content.classList.remove('block', 'animate-fade-in-up');
    });

    const target = document.getElementById(`history-${year}`);
    if(target) {
        target.classList.remove('hidden');
        // Small delay to allow display:block to apply before animating opacity
        setTimeout(() => {
            target.classList.remove('opacity-0', 'translate-y-4');
        }, 50);
    }
};

function initScrollAnimations() { 
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active', 'animate__animated', 'animate__fadeInUp', 'animate-soft');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px" // Trigger slightly before bottom
    });

    document.querySelectorAll('.reveal:not(.active)').forEach(el => {
        observer.observe(el);
    });
}
function checkCelebrations() { /* ... */ }
function getCategoryName(c) { 
    const map = { 'QLTN': 'Quản Lý Tòa Nhà', 'BTKT': 'Bảo Trì Kỹ Thuật', 'TV': 'Tư Vấn', 'CN': 'Công Nghệ', 'Apartment': 'Chung Cư', 'Industrial': 'Khu Công Nghiệp', 'Office': 'Văn Phòng' };
    return map[c] || c; 
}
