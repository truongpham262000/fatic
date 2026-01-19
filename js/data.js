const faticData = {
    navigation: [
        { name: "Trang Chủ", link: "index.html", type: "link" },
        { name: "Giới Thiệu", link: "about.html", type: "link" },
        { 
            name: "Dịch Vụ", 
            link: "services.html", 
            type: "dropdown",
            items: [
                { name: "Tất Cả Dịch Vụ", link: "services.html" },
                { name: "Quản Lý Tòa Nhà", link: "services.html?category=QLTN" },
                { name: "Bảo Trì Kỹ Thuật", link: "services.html?category=BTKT" },
                { name: "Tư Vấn & Setup", link: "services.html?category=TV" },
                { name: "Công Nghệ & Smarthome", link: "services.html?category=CN" },
                { name: "✨ Vệ Sinh & Cảnh Quan", link: "services.html?category=QLTN" }, // Highlighted new
                { name: "✨ Smart Parking", link: "services.html?category=CN" }        // Highlighted new
            ]
        },
        { 
            name: "Dự Án", 
            link: "projects.html", 
            type: "dropdown",
            items: [
                { name: "Tất Cả Dự Án", link: "projects.html" },
                { name: "Chung Cư Cao Cấp", link: "projects.html?category=Apartment" },
                { name: "Khu Công Nghiệp", link: "projects.html?category=Industrial" },
                { name: "Văn Phòng & TM", link: "projects.html?category=Office" },
                { name: "Đô Thị Thông Minh", link: "projects.html?category=SmartCity" }
            ]
        },
        { 
            name: "Tin Tức", 
            link: "news.html", 
            type: "dropdown",
            items: [
                 { name: "Tất Cả Tin Tức", link: "news.html" },
                 { name: "Tin Công Ty", link: "news.html?category=Tin Công Ty" }, // Matches category in data
                 { name: "Sự Kiện", link: "news.html?category=Sự Kiện" },
                 { name: "Hoạt Động & Phong Trào", link: "news.html?category=Hoạt Động" }
            ]
        },
        { name: "Liên Hệ", link: "contact.html", type: "button" }
    ],
    services: [
        {
            id: "s1",
            title: "Quản Lý Vận Hành Tòa Nhà Chung Cư",
            category: "QLTN",
            icon: "fas fa-building",
            shortDesc: "Dịch vụ quản lý toàn diện giúp tối ưu chi phí và nâng cao giá trị tài sản.",
            fullDesc: "FATIC cung cấp giải pháp quản lý vận hành tòa nhà trọn gói, bao gồm: quản lý kỹ thuật, an ninh, vệ sinh, và chăm sóc khách hàng. Chúng tôi áp dụng quy trình chuẩn quốc tế ISO 9001:2015 để đảm bảo sự an toàn và tiện nghi tối đa.",
            image: "images/service_building.png",
            gallery: ["images/content_maintenance.png", "images/content_meeting.png", "images/service_building.png"],
            content: `
                <h3>Tiêu Chuẩn 5 Sao</h3>
                <p>Chúng tôi mang đến trải nghiệm sống đẳng cấp cho cư dân thông qua dịch vụ lễ tân chuyên nghiệp, an ninh đa lớp và kiểm soát vệ sinh nghiêm ngặt.</p>
                <h3>Quy Trình Quản Lý Chuyên Nghiệp</h3>
                <p>Chúng tôi xây dựng hệ thống quản lý dựa trên đặc thù của từng dự án. Từ việc kiểm soát an ninh 24/7 đến duy trì vệ sinh, cảnh quan, mọi hoạt động đều được giám sát chặt chẽ.</p>
                <h3>Tối Ưu Hóa Chi Phí</h3>
                <p>Thông qua việc áp dụng công nghệ vào quản lý năng lượng và bảo trì hệ thống ngăn ngừa, FATIC cam kết giảm thiểu chi phí vận hành từ 10-15% cho chủ đầu tư mà vẫn đảm bảo chất lượng dịch vụ 5 sao.</p>
            `
        },
        {
            id: "s2",
            title: "Bảo Trì Kỹ Thuật Công Nghiệp",
            category: "BTKT",
            icon: "fas fa-cogs",
            shortDesc: "Giải pháp bảo trì ngăn ngừa, khắc phục sự cố hệ thống M&E, HVAC.",
            fullDesc: "Chuyên cung cấp dịch vụ bảo trì định kỳ và sửa chữa cho các nhà máy, khu công nghiệp. Hệ thống M&E, điện lạnh, PCCC vận hành ổn định là cam kết của chúng tôi.",
            image: "images/service_industrial.png",
            gallery: ["images/content_maintenance.png", "images/service_industrial.png"],
             content: `
                <h3>Bảo Trì Ngăn Ngừa (Preventive Maintenance)</h3>
                <p>Chúng tôi không đợi hỏng mới sửa. Kế hoạch bảo trì ngăn ngừa được lập chi tiết nhằm phát hiện sớm các rủi ro hư hỏng của máy móc, thiết bị.</p>
                <h3>Hệ Thống M&E</h3>
                <p>Đội ngũ kỹ sư cơ điện giàu kinh nghiệm của FATIC đảm nhận bảo trì toàn bộ hệ thống điện động lực, điện nhẹ, cấp thoát nước và điều hòa thông gió.</p>
            `
        },
         {
            id: "s5",
            title: "Bảo Trì Thang Máy & PCCC",
            category: "BTKT",
            icon: "fas fa-wrench",
            shortDesc: "Đảm bảo an toàn tuyệt đối cho hệ thống vận chuyển và phòng cháy.",
            fullDesc: "Dịch vụ kiểm tra, bảo dưỡng định kỳ hệ thống thang máy và PCCC tuân thủ nghiêm ngặt các quy định an toàn của nhà nước và tiêu chuẩn quốc tế.",
            image: "images/content_maintenance.png",
            gallery: ["images/content_maintenance.png"],
            content: `<h3>An Toàn Là Trên Hết</h3><p>Hệ thống PCCC và thang máy là huyết mạch an toàn của tòa nhà. Chúng tôi thực hiện kiểm tra tải, kiểm tra áp lực định kỳ hàng tháng.</p>`
        },
        {
            id: "s3",
            title: "Tư Vấn & Setup Hệ Thống",
            category: "TV",
            icon: "fas fa-clipboard-check",
            shortDesc: "Tư vấn quy trình, xây dựng bộ máy quản lý vận hành từ giai đoạn bàn giao.",
            fullDesc: "Hỗ trợ Chủ đầu tư xây dựng ngân sách vận hành, nội quy cư dân, quy trình xử lý sự cố và tuyển dụng đào tạo nhân sự ban quản lý.",
            image: "images/content_meeting.png",
            gallery: ["images/content_meeting.png", "images/service_tech_app.png"],
             content: `
                <h3>Tư Vấn Giai Đoạn Tiền Khai Trương</h3>
                <p>Giai đoạn bàn giao nhà là giai đoạn nhạy cảm nhất. FATIC đồng hành cùng CĐT để thiết lập quy trình bàn giao, kiểm soát lỗi thi công (Defect list) và đón tiếp cư dân.</p>
                <h3>Chuyển Giao Công Nghệ</h3>
                <p>Chúng tôi chuyển giao các phần mềm quản lý, App cư dân giúp số hóa toàn bộ hoạt động tương tác và thanh toán phí dịch vụ.</p>
            `
        },
         {
            id: "s4",
            title: "Ứng Dụng Công Nghệ Smarthome",
            category: "CN",
            icon: "fas fa-mobile-alt",
            shortDesc: "Giải pháp nhà thông minh tích hợp quản lý tập trung.",
            fullDesc: "Cung cấp giải pháp Smarthome, Smart Parking, FaceID kiểm soát ra vào, giúp nâng tầm đẳng cấp dự án và thuận tiện cho cư dân.",
            image: "images/future_tech_hub.png",
            gallery: ["images/future_tech_hub.png", "images/service_tech_app.png"],
             content: `
                <h3>Hệ Sinh Thái IoT</h3>
                <p>Kết nối vạn vật, cho phép cư dân điều khiển thiết bị trong nhà từ xa và nhận thông báo từ Ban quản lý ngay trên điện thoại.</p>
            `
        },
        {
            id: "s6",
            title: "Giải Pháp Quản Lý Năng Lượng (EMS)",
            category: "CN",
            icon: "fas fa-solar-panel",
            shortDesc: "Giám sát và tối ưu hóa tiêu thụ điện năng cho tòa nhà.",
            fullDesc: "Hệ thống giám sát năng lượng thông minh giúp phát hiện lãng phí, tự động điều chỉnh hệ thống chiếu sáng và điều hòa không khí.",
            image: "images/future_tech_hub.png",
            gallery: ["images/service_tech_app.png"],
             content: `<h3>Green Energy</h3><p>Cam kết giảm lượng khí thải carbon và tiết kiệm chi phí điện năng lên đến 20%.</p>`
        },
        // --- ADDED DATA ---
        {
            id: "s7",
            title: "Vệ Sinh Công Nghiệp & Cảnh Quan",
            category: "QLTN",
            icon: "fas fa-broom",
            shortDesc: "Dịch vụ vệ sinh chuyên sâu và chăm sóc cây xanh, cảnh quan đô thị.",
            fullDesc: "Mang lại môi trường sống xanh - sạch - đẹp. Chúng tôi sử dụng các thiết bị vệ sinh hiện đại và hóa chất thân thiện với môi trường.",
            image: "images/service_building.png",
            content: `<h3>Không Gian Xanh</h3><p>Đội ngũ chăm sóc cảnh quan chuyên nghiệp đảm bảo khuôn viên luôn tươi mát, tạo cảm giác thư thái cho cư dân.</p>`
        },
        {
            id: "s8",
            title: "Quản Lý Bãi Đỗ Xe Thông Minh",
            category: "CN",
            icon: "fas fa-parking",
            shortDesc: "Hệ thống giữ xe tự động, nhận diện biển số.",
            fullDesc: "Giải pháp bãi đỗ xe thông minh giúp giải quyết bài toán ùn tắc giờ cao điểm, minh bạch doanh thu và thuận tiện cho cư dân.",
            image: "images/future_tech_hub.png",
             content: `<h3>Smart Parking</h3><p>Tích hợp thẻ cư dân, nhận diện biển số AI chính xác 99.9%.</p>`
        },
         {
            id: "s9",
            title: "Tư Vấn Pháp Lý Bất Động Sản",
            category: "TV",
            icon: "fas fa-balance-scale",
            shortDesc: "Tư vấn quy trình tổ chức Hội nghị nhà chung cư, thành lập Ban Quản Trị.",
            fullDesc: "Hỗ trợ chủ đầu tư và cư dân thực hiện đúng các quy định của pháp luật về nhà ở, tổ chức hội nghị nhà chung cư thành công.",
             image: "images/content_meeting.png",
             content: `<h3>Am Hiểu Luật Pháp</h3><p>Đội ngũ luật sư giàu kinh nghiệm tư vấn giải quyết các tranh chấp phát sinh trong quá trình vận hành.</p>`
        }
    ],
    projects: [
        {
            id: "p1",
            title: "Khu Phức Hợp The Zen Residence",
            category: "Apartment",
            date: "2023 - Nay",
            description: "Quản lý vận hành khu căn hộ cao cấp với hơn 1000 căn hộ và 3 tầng thương mại.",
            image: "images/project_apartment.png",
            gallery: ["images/project_apartment.png", "images/future_smart_city.png"],
            content: `
                <h3>Tổng Quan Dự Án</h3>
                <p>The Zen Residence là biểu tượng của phong cách sống Nhật Bản tại Hà Nội. Với quy mô 3 tòa tháp cao 31 tầng, dự án đòi hỏi tiêu chuẩn quản lý khắt khe về an ninh và vệ sinh.</p>
                <h3>Thách Thức & Giải Pháp</h3>
                <p>Với mật độ cư dân cao, FATIC đã triển khai hệ thống kiểm soát ra vào thông minh FaceID và ứng dụng App cư dân để giải quyết bài toán giao tiếp và thanh toán phí.</p>
            `
        },
        {
            id: "p4",
            title: "Royal City Premium",
            category: "Apartment",
            date: "2024",
            description: "Chuẩn mực sống hoàng gia với dịch vụ quản gia 24/7.",
            image: "images/project_apartment.png",
            gallery: ["images/project_apartment.png"],
             content: `<h3>Đẳng Cấp Thượng Lưu</h3><p>FATIC cung cấp đội ngũ quản gia riêng, phục vụ mọi nhu cầu của cư dân từ đặt vé máy bay đến tổ chức tiệc tại gia.</p>`
        },
        {
            id: "p2",
            title: "Nhà Máy SamSung R&D",
            category: "Industrial",
            date: "2024",
            description: "Dịch vụ bảo trì hệ thống điều hòa trung tâm Chiller và hệ thống điện nhẹ.",
            image: "images/project_factory.png",
            gallery: ["images/content_maintenance.png", "images/project_factory.png"],
            content: `
                <h3>Hạng Mục Thực Hiện</h3>
                <p>FATIC chịu trách nhiệm bảo dưỡng định kỳ 6 tháng/lần cho hệ thống 12 tháp giải nhiệt và cụm máy nén khí trung tâm.</p>
                <h3>Kết Quả</h3>
                <p>Đảm bảo hệ thống hoạt động liên tục 24/7 phục vụ nghiên cứu, giảm thiểu thời gian downtime xuống dưới 0.1%.</p>
            `
        },
        {
            id: "p5",
            title: "VinFast Hai Phong Complex",
            category: "Industrial",
            date: "2025",
            description: "Quản lý kỹ thuật hạ tầng khu tổ hợp sản xuất.",
            image: "images/project_factory.png",
            gallery: ["images/project_factory.png"],
             content: `<h3>Quy Mô Lớn</h3><p>Quản lý hệ thống xử lý nước thải và trạm biến áp 110kV cho toàn bộ khu phức hợp.</p>`
        },
        {
            id: "p6",
            title: "FPT Software Park",
            category: "Office",
            date: "2023",
            description: "Quản lý vận hành tòa nhà văn phòng thông minh.",
            image: "images/project_apartment.png",
            gallery: ["images/project_apartment.png"],
            content: `<h3>Môi Trường Sáng Tạo</h3><p>Đảm bảo không gian làm việc xanh, sạch, đẹp với hệ thống điều hòa không khí thông minh.</p>`
        },
        {
            id: "p3",
            title: "Khu Đô Thị Ecopark Hưng Yên",
            category: "SmartCity",
            date: "2025",
            description: "Tư vấn setup quy trình quản lý cảnh quan và môi trường.",
            image: "images/future_smart_city.png",
            gallery: ["images/future_smart_city.png", "images/project_apartment.png"],
             content: `
                <h3>Mô Hình Quản Lý Xanh</h3>
                <p>Tư vấn xây dựng quy trình chăm sóc cây xanh, xử lý rác thải thông minh nhằm duy trì không gian sống xanh chuẩn mực.</p>
            `
        },
        // --- ADDED FILES ---
         {
            id: "p7",
            title: "Landmark 81 Tower",
            category: "Apartment",
            date: "2025",
            description: "Dịch vụ kỹ thuật trên cao và bảo trì hệ thống kính mặt ngoài.",
            image: "images/project_apartment.png",
             content: `<h3>Biểu Tượng Việt Nam</h3><p>FATIC tự hào tham gia vào đội ngũ kỹ thuật bảo trì tòa nhà cao nhất Việt Nam.</p>`
        },
         {
            id: "p8",
            title: "KCN VSIP Bắc Ninh",
            category: "Industrial",
            date: "2024 - Nay",
            description: "Quản lý hạ tầng chung và hệ thống xử lý nước thải KCN.",
            image: "images/project_factory.png",
             content: `<h3>Chuẩn Singapore</h3><p>Áp dụng tiêu chuẩn quản lý khu công nghiệp xanh, sạch, phát triển bền vững.</p>`
        },
        {
            id: "p9",
            title: "TechnoPark Tower",
            category: "Office",
            date: "2024",
            description: "Vận hành tòa nhà văn phòng thông minh Top 10 thế giới.",
            image: "images/project_apartment.png",
             content: `<h3>Công Nghệ Dẫn Đầu</h3><p>Hệ thống AI kiểm soát năng lượng và an ninh 24/7.</p>`
        },
         {
            id: "p10",
            title: "Ocean Park Smart City",
            category: "SmartCity",
            date: "2026",
            description: "Tư vấn giải pháp giao thông thông minh và an ninh đô thị.",
            image: "images/future_smart_city.png",
             content: `<h3>Thành Phố Biển Hồ</h3><p>Giải pháp an ninh đa lớp giúp cư dân an tâm tận hưởng cuộc sống nghỉ dưỡng.</p>`
        }
    ],
    news: [
        {
            id: "n1",
            title: "Lễ Ký Kết Hợp Tác Chiến Lược Với Viettel Construction",
            category: "Tin Công Ty",
            date: "15/05/2026",
            content: "FATIC và Viettel Construction chính thức ký kết thỏa thuận hợp tác về việc cung cấp giải pháp Smart Home cho các dự án chung cư.",
            image: "images/content_meeting.png",
            gallery: ["images/content_meeting.png", "images/future_tech_hub.png"],
            fullContent: `
                <h3>Bước Tiến Mới Trong Ứng Dụng Công Nghệ</h3>
                <p>Sáng ngày 15/05/2026, tại trụ sở FATIC Tower, lễ ký kết thỏa thuận hợp tác chiến lược giữa FATIC và Viettel Construction đã diễn ra thành công tốt đẹp.</p>
                <p>Theo thỏa thuận, hai bên sẽ cùng nhau nghiên cứu và triển khai các gói giải pháp Smart Home (Nhà thông minh) dành riêng cho phân khúc chung cư tầm trung và cao cấp mà FATIC đang quản lý vận hành.</p>
                <img src="images/content_meeting.png" alt="Signing Ceremony" class="w-full rounded-lg shadow-md my-4">
                <h3>Lợi Ích Cho Cư Dân</h3>
                <p>Sự hợp tác này hứa hẹn mang lại trải nghiệm sống tiện nghi hơn cho cư dân, khi họ có thể điều khiển toàn bộ thiết bị điện trong nhà thông qua ứng dụng FATIC Life được tích hợp sâu với nền tảng của Viettel.</p>
            `
        },
        {
            id: "n2",
            title: "Hội Thảo: Xu Hướng Quản Lý Vận Hành Tòa Nhà 2026",
            category: "Sự Kiện",
            date: "10/06/2026",
            content: "FATIC tham gia với tư cách diễn giả chính, chia sẻ về ứng dụng AI trong quản lý rủi ro.",
            image: "images/future_tech_hub.png",
            gallery: ["images/future_tech_hub.png", "images/content_meeting.png"],
            fullContent: `
                <h3>Chuyển Đổi Số Là Tất Yếu</h3>
                <p>Tại hội thảo, CEO của FATIC đã nhấn mạnh vai trò của dữ liệu lớn (Big Data) trong việc dự báo các sự cố kỹ thuật. Việc chuyển đổi số không chỉ giúp giảm chi phí mà còn tăng tính minh bạch trong quản lý tài chính tòa nhà.</p>
            `
        },
        {
            id: "n3",
            title: "FATIC Chào Đón Thành Viên Thứ 500",
            category: "Tin Nội Bộ",
            date: "20/06/2026",
            content: "Cột mốc quan trọng đánh dấu sự phát triển vượt bậc về quy mô nhân sự của FATIC.",
            image: "images/content_meeting.png",
             fullContent: `<h3>Gia Đình FATIC Lớn Mạnh</h3><p>Chúng tôi chào đón cán bộ nhân viên thứ 500 gia nhập khối Quản lý vận hành.</p>`
        },
         {
            id: "n4",
            title: "Đào Tạo PCCC Định Kỳ Quý II/2026",
            category: "Hoạt Động",
            date: "01/07/2026",
            content: "Nâng cao kỹ năng xử lý sự cố cháy nổ cho lực lượng an ninh và kỹ thuật tại dự án.",
            image: "images/content_maintenance.png",
             fullContent: `<h3>An Toàn Là Sinh Mệnh</h3><p>Buổi diễn tập có sự tham gia của Cảnh sát PCCC TP Hà Nội nhằm đảm bảo tính thực tế cao nhất.</p>`
        }
    ]
};
