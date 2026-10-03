import { Product, BlogPost, Review, SiteSettings } from '../types';

export const initialSiteSettings: SiteSettings = {
  brandName: 'Mộc Điều',
  slogan: 'Mộc vị tự nhiên – Trọn vị hạt điều.',
  announcementText: 'Mộc vị tự nhiên – Miễn phí vận chuyển cho đơn hàng từ 500.000đ',
  hotlinePlaceholder: '0389614159',
  emailPlaceholder: 'mocdieu2026@gmail.com',
  addressPlaceholder: 'Số 6A Chợ Bến Thành, Quận 1, TP. Hồ Chí Minh',
  tiktokPlaceholder: 'mocdieu_',
  facebookPlaceholder: 'Mộc Điều',
  zaloPlaceholder: '0389614159',
  googleAnalyticsId: '[GOOGLE_ANALYTICS_ID]',
  tiktokPixelId: '[TIKTOK_PIXEL_ID]',
  metaPixelId: '[META_PIXEL_ID]',
  freeShippingThreshold: 500000,
  standardShippingFee: 30000,
};

export const initialProducts: Product[] = [
  {
    id: 'prod-1',
    name: 'Hạt Điều Rang Muối Vỏ Lụa Mộc Điều',
    slug: 'hat-dieu-rang-muoi-vo-lua',
    description: 'Hạt điều rang muối giữ trọn lớp vỏ lụa tự nhiên, được lựa chọn kỹ lưỡng từng hạt tròn đều, chắc mẩy. Công nghệ rang mộc thủ công với hạt muối biển tạo nên vị giòn rụm bên ngoài, bùi béo đậm đà bên trong mà không hề mặn gắt.',
    shortDescription: 'Hạt điều nguyên hạt chọn lọc rang cùng muối biển tự nhiên, giữ trọn lớp vỏ lụa mộc mạc giòn bùi.',
    price: 155000,
    salePrice: 145000,
    weight: '500g',
    image: '/images/regenerated_image_1790907946473.png',
    gallery: [
      '/images/regenerated_image_1790907946473.png',
      '/images/regenerated_image_1790908327611.png',
      '/images/regenerated_image_1790908455367.png',
    ],
    ingredients: 'Hạt điều vỏ lụa chọn lọc (99%), muối biển tinh khiết (1%)',
    usage: 'Tách nhẹ lớp vỏ lụa trước khi dùng. Dùng ăn trực tiếp, làm món ăn nhẹ bổ dưỡng hoặc thưởng thức cùng trà mộc.',
    storage: 'Bảo quản nơi khô ráo, thoáng mát, tránh ánh nắng trực tiếp. Đậy kín nắp hũ sau mỗi lần sử dụng.',
    stock: 85,
    featured: true,
    category: 'roasted_salt',
    badges: ['Bán chạy', 'Mộc vị'],
    createdAt: '2026-09-15T08:00:00.000Z',
    updatedAt: '2026-09-15T08:00:00.000Z',
  },
  {
    id: 'prod-2',
    name: 'Hạt Điều Tự Nhiên Rang Mộc Không Muối',
    slug: 'hat-dieu-rang-moc-khong-muoi',
    description: 'Dành riêng cho những ai yêu mến sự thanh lành nguyên bản. Hạt điều được bóc sạch vỏ lụa, sấy mộc ở nhiệt độ tối ưu nhằm giữ lại trọn vẹn vị ngọt thanh mát, độ ngậy béo bùi và dưỡng chất tinh túy của hạt.',
    shortDescription: 'Hạt điều bóc vỏ lụa sấy mộc nguyên vị ngọt bùi tự nhiên, không tẩm ướp muối hay phụ gia.',
    price: 165000,
    weight: '500g',
    image: '/images/regenerated_image_1790908327611.png',
    gallery: [
      '/images/regenerated_image_1790908327611.png',
      '/images/regenerated_image_1790907946473.png',
      '/images/regenerated_image_1790908455367.png',
    ],
    ingredients: 'Hạt điều nguyên chất 100% (không muối, không đường, không chất bảo quản)',
    usage: 'Ăn trực tiếp, làm sữa hạt điều dinh dưỡng, rắc lên salad, granola hoặc kết hợp cùng sữa chua ngũ cốc.',
    storage: 'Bảo quản nhiệt độ phòng nơi khô ráo, đậy kín nắp. Có thể để ngăn mát tủ lạnh để giữ độ giòn thơm lâu hơn.',
    stock: 62,
    featured: true,
    category: 'plain',
    badges: ['100% Nguyên vị', 'Thanh lành'],
    createdAt: '2026-09-16T09:00:00.000Z',
    updatedAt: '2026-09-16T09:00:00.000Z',
  },
  {
    id: 'prod-3',
    name: 'Hộp Quà Mộc Điều - Vị Mộc An Yên',
    slug: 'hop-qua-moc-dieu-vi-moc-an-yen',
    description: 'Hộp quà thủ công với chất liệu giấy mộc thân thiện môi trường, thiết kế tối giản mang dấu ấn văn hóa Việt. Bên trong gồm 2 hũ hạt điều cao cấp (1 Hạt điều rang muối vỏ lụa và 1 Hạt điều sấy mộc tự nhiên), là lời chúc trân quý gửi đến người thân, bạn hữu và đối tác.',
    shortDescription: 'Bộ quà tặng hạt điều thủ công tối giản mang phong vị mộc Việt Nam, gửi gắm sự an yên và trọn vẹn.',
    price: 385000,
    salePrice: 360000,
    weight: 'Hộp 2 hũ x 400g',
    image: '/images/regenerated_image_1790908455367.png',
    gallery: [
      '/images/regenerated_image_1790908455367.png',
      '/images/regenerated_image_1790907946473.png',
      '/images/regenerated_image_1790908327611.png',
    ],
    ingredients: 'Hạt điều vỏ lụa rang muối (400g) + Hạt điều rang mộc tự nhiên (400g)',
    usage: 'Món quà trang trọng cho các dịp lễ tết, mừng tân gia, sinh nhật hoặc tri ấn đối tác kinh doanh.',
    storage: 'Bảo quản nơi thoáng mát, khô ráo, tránh ẩm mốc.',
    stock: 35,
    featured: true,
    category: 'gift',
    badges: ['Quà tặng cao cấp', 'Tinh tế'],
    createdAt: '2026-09-18T10:00:00.000Z',
    updatedAt: '2026-09-18T10:00:00.000Z',
  },
  {
    id: 'prod-4',
    name: 'Hạt Điều Rang Muối Túi Zip Tiện Lợi',
    slug: 'hat-dieu-rang-muoi-tui-zip-250g',
    description: 'Phiên bản túi zip giấy kraft thân thiện, đóng gói vừa vặn 250g tiện lợi để mang theo đi làm, tập luyện hoặc các chuyến dã ngoại. Giữ nguyên chất lượng hạt điều tuyển chọn, rang muối giòn rụm.',
    shortDescription: 'Túi zip nhỏ gọn mộc mạc, tiện lợi thưởng thức mỗi ngày tại văn phòng hay khi di chuyển.',
    price: 85000,
    weight: '250g',
    image: '/images/regenerated_image_1790908624500.png',
    gallery: [
      '/images/regenerated_image_1790908624500.png',
      '/images/regenerated_image_1790907946473.png',
    ],
    ingredients: 'Hạt điều vỏ lụa chọn lọc (99%), muối biển tự nhiên (1%)',
    usage: 'Dùng trực tiếp, vuốt kín khóa zip sau khi dùng.',
    storage: 'Bảo quản nơi khô ráo, tránh ẩm ướt.',
    stock: 110,
    featured: false,
    category: 'roasted_salt',
    badges: ['Tiện lợi'],
    createdAt: '2026-09-20T11:00:00.000Z',
    updatedAt: '2026-09-20T11:00:00.000Z',
  }
];

export const initialBlogPosts: BlogPost[] = [
  {
    id: 'post-1',
    title: 'Cách bảo quản hạt điều giữ trọn độ giòn và hương vị tự nhiên',
    slug: 'cach-bao-quan-hat-dieu-giu-tron-do-gion',
    excerpt: 'Hạt điều rất nhạy cảm với độ ẩm và không khí. Tìm hiểu những mẹo bảo quản đơn giản tại nhà giúp hạt giữ nguyên độ giòn bùi và tránh ỉu dầu.',
    content: `
# Cách bảo quản hạt điều giữ trọn độ giòn và hương vị tự nhiên

Hạt điều là loại hạt giàu dinh dưỡng với hàm lượng chất béo tốt tự nhiên cao. Tuy nhiên, chính vì có nhiều dầu tự nhiên và không sử dụng chất bảo quản công nghiệp, hạt điều rất dễ bị ỉu, mất giòn hoặc gắt dầu nếu để tiếp xúc lâu ngoài không khí.

Dưới đây là những nguyên tắc vàng từ Mộc Điều để bạn thưởng thức hạt điều luôn giòn tan như vừa mới rang:

### 1. Đậy thật kín nắp sau mỗi lần sử dụng
Mỗi lần mở nắp hũ hạt điều, không khí ẩm sẽ lập tức tràn vào. Hãy chỉ lấy vừa đủ phần hạt muốn ăn trong một lần, sau đó vặn chặt nắp ngay lập tức. Nếu dùng túi zip, hãy miết ép bớt không khí thừa ra ngoài trước khi khóa kín.

### 2. Tránh nơi ẩm ướt và ánh sáng mặt trời chiếu trực tiếp
Nhiệt độ cao và tia UV làm tăng nhanh quá trình oxy hóa chất béo trong hạt, khiến hạt có mùi gắt. Hãy cất giữ hạt ở kệ tủ thoáng mát, cao ráo, cách xa khu vực nấu ăn nhiều hơi nóng và dầu mỡ.

### 3. Bí quyết bảo quản trong ngăn mát tủ lạnh
Nếu bạn mua hũ lớn và dự định dùng dần trong hơn một tháng, hãy cho hũ hạt điều đã đậy thật kín vào ngăn mát tủ lạnh. Môi trường lạnh và khô ráo của tủ lạnh sẽ làm chậm tối đa quá trình oxy hóa, giữ độ giòn bùi hoàn hảo đến 6 tháng.

### 4. Cách phục hồi độ giòn nếu hạt lỡ bị ỉu
Nếu chẳng may hạt bị giảm độ giòn do mở nắp lâu, bạn hoàn toàn có thể phục hồi dễ dàng:
- Làm nóng nồi chiên không dầu hoặc lò nướng ở 140°C trong 3 phút.
- Cho hạt vào sấy nhẹ trong 3 - 5 phút.
- Để hạt nguội hoàn toàn ở nhiệt độ phòng trước khi ăn hoặc cất lại vào hũ kín. Hạt sẽ lập tức giòn tan trở lại.

Chúc bạn luôn có những khoảnh khắc nhâm nhi hạt điều thật tròn vị!
    `,
    coverImage: '/images/regenerated_image_1790909542475.png',
    author: 'Mộc Điều',
    category: 'Mẹo bảo quản',
    readTime: '4 phút đọc',
    published: true,
    publishedAt: '2026-09-22T09:00:00.000Z',
    createdAt: '2026-09-22T09:00:00.000Z',
    updatedAt: '2026-09-22T09:00:00.000Z',
  },
  {
    id: 'post-2',
    title: 'Cách nhận biết hạt điều ngon: Từ dáng hạt, màu sắc đến độ bùi béo',
    slug: 'cach-nhan-biet-hat-dieu-ngon',
    excerpt: 'Làm thế nào để phân biệt hạt điều chuẩn chất lượng cao với hạt bị mốc, sâu hay hạt cũ kém chất lượng? Khám phá 4 tiêu chí cốt lõi.',
    content: `
# Cách nhận biết hạt điều ngon: Từ dáng hạt, màu sắc đến độ bùi béo

Khi thị trường có quá nhiều loại hạt điều với đủ mức giá khác nhau, người tiêu dùng rất dễ bối rối. Một mẻ hạt điều thực sự chất lượng sẽ thể hiện rõ nét từ thị giác, khứu giác cho đến hậu vị.

### 1. Dáng hạt và độ nguyên vẹn
Hạt điều ngon phải có thân hạt căng tròn mẩy, đặc ruột, không bị teo lép. Hạt đều size, không lẫn nhiều mảnh vụn nát hay hạt sâu đốm đen. Hạt có độ cong hình trăng khuyết tự nhiên và chắc tay.

### 2. Màu sắc hạt
- **Với hạt điều rang muối vỏ lụa**: Lớp vỏ lụa mỏng có màu nâu đất hoặc nâu cánh gián đồng đều, không bị cháy xém đen thui. Khi bóc vỏ ra, nhân hạt bên trong có màu vàng óng ngà nhẹ, sáng màu.
- **Với hạt điều sấy mộc bóc vỏ**: Hạt mang sắc trắng kem tự nhiên, đồng nhất, không xỉn màu hay lốm đốm ố vàng vì ẩm mốc.

### 3. Mùi hương khi mở hũ
Hạt điều chuẩn mới rang sẽ tỏa hương thơm bùi đặc trưng, dịu nhẹ tự nhiên. Nếu bạn ngửi thấy mùi hắc nồng, mùi dầu ẩm hoặc mùi chất bảo quản lạ thì tuyệt đối không nên sử dụng.

### 4. Vị bùi béo tự nhiên và độ giòn
Khi cắn vào, hạt tạo cảm giác giòn rụm dứt khoát nhưng không bị cứng xơ xác. Tiếp đến là vị ngọt hậu kéo dài sâu trong vòm họng cùng chất béo ngậy mượt mà. Với hạt điều rang muối chuẩn, vị mặn chỉ thoang thoảng ở đầu lưỡi, tôn lên vị bùi chứ không lấn át vị ngọt nguyên bản của hạt.
    `,
    coverImage: '/images/regenerated_image_1790907946473.png',
    author: 'Mộc Điều',
    category: 'Kiến thức hạt',
    readTime: '5 phút đọc',
    published: true,
    publishedAt: '2026-09-25T14:30:00.000Z',
    createdAt: '2026-09-25T14:30:00.000Z',
    updatedAt: '2026-09-25T14:30:00.000Z',
  },
  {
    id: 'post-3',
    title: 'Hạt điều rang muối và hạt điều tự nhiên: Nên chọn loại nào cho khẩu vị của bạn?',
    slug: 'hat-dieu-rang-muoi-va-hat-dieu-tu-nhien',
    excerpt: 'Rang muối vỏ lụa hay sấy mộc nguyên vị không muối? Cùng so sánh sự khác biệt về hương vị, dinh dưỡng và mục đích sử dụng.',
    content: `
# Hạt điều rang muối và hạt điều tự nhiên: Nên chọn loại nào?

Tại Mộc Điều, hai dòng sản phẩm được quan tâm nhiều nhất là **Hạt điều rang muối vỏ lụa** và **Hạt điều rang mộc tự nhiên**. Mỗi dòng sản phẩm đều có nét cuốn hút riêng:

### 1. Hạt điều rang muối vỏ lụa
- **Đặc điểm**: Giữ nguyên lớp vỏ lụa mộc, rang cùng muối hạt tự nhiên.
- **Trải nghiệm**: Vỏ lụa giúp bảo vệ nhân hạt không bị áp nhiệt trực tiếp, giữ cho hạt siêu giòn. Khi ăn, động tác bóc nhẹ lớp vỏ lụa mang lại cảm giác mộc mạc thư thái. Muối tạo vị đậm đà kích thích vị giác.
- **Phù hợp nhất**: Nhâm nhi ăn vặt, uống trà chiều, tiếp khách tại phòng khách, tiệc nhẹ sum vầy cùng gia đình.

### 2. Hạt điều rang mộc tự nhiên (không muối)
- **Đặc điểm**: Bóc sạch vỏ lụa, sấy mộc không gia vị.
- **Trải nghiệm**: Vị ngọt thanh thuần túy, béo dịu, không gây cảm giác khát nước.
- **Phù hợp nhất**: Người theo lối sống lành mạnh (Eat Clean, giảm muối), người lớn tuổi, phụ nữ mang thai, trẻ nhỏ, người thích tự làm sữa hạt hoặc làm topping ngũ cốc buổi sáng.

Cả hai dòng sản phẩm đều là lựa chọn tuyệt vời từ thiên nhiên. Tùy theo nhu cầu và sở thích, bạn có thể chọn dòng sản phẩm phù hợp nhất cho mình và người thân.
    `,
    coverImage: '/images/cashew_giftbox_1790901540798.jpg',
    author: 'Mộc Điều',
    category: 'Cẩm nang dinh dưỡng',
    readTime: '4 phút đọc',
    published: true,
    publishedAt: '2026-09-28T16:00:00.000Z',
    createdAt: '2026-09-28T16:00:00.000Z',
    updatedAt: '2026-09-28T16:00:00.000Z',
  }
];

// In strict accordance with Rule 13 & Rule 30:
// "Review phải lấy từ database. Nếu database chưa có review: Hiển thị placeholder. KHÔNG tự tạo review giả."
export const initialReviews: Review[] = [];
