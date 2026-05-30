const db = require('../models');

const categories = [
  { id: 1, name: '小玩意儿', sort_order: 1, icon_url: '/uploads/icons/gift.png' },
  { id: 2, name: '手冲', sort_order: 2, icon_url: '/uploads/icons/pour.png' },
  { id: 3, name: '蛋糕', sort_order: 3, icon_url: '/uploads/icons/cake.png' },
  { id: 4, name: '圣诞限定', sort_order: 4, icon_url: '/uploads/icons/christmas.png' },
  { id: 5, name: '咖啡', sort_order: 5, icon_url: '/uploads/icons/coffee.png' },
  { id: 6, name: '特调咖啡', sort_order: 6, icon_url: '/uploads/icons/special.png' },
  { id: 7, name: '茶饮', sort_order: 7, icon_url: '/uploads/icons/tea.png' },
  { id: 8, name: '冰淇淋', sort_order: 8, icon_url: '/uploads/icons/icecream.png' }
];

const coffeeSpecs = JSON.stringify([
  { name: '温度', options: ['热饮', '少冰', '去冰', '正常冰'] },
  { name: '糖度', options: ['正常糖', '少糖', '半糖', '无糖'] },
  { name: '杯型', options: ['中杯', '大杯', '超大杯'] }
]);

const pourSpecs = JSON.stringify([
  { name: '研磨度', options: ['细研磨', '中研磨', '粗研磨'] }
]);

const cakeSpecs = JSON.stringify([
  { name: '规格', options: ['切片', '整蛋糕'] }
]);

const iceCreamSpecs = JSON.stringify([
  { name: '口味', options: ['香草', '巧克力', '抹茶', '草莓'] }
]);

const giftSpecs = JSON.stringify([
  { name: '款式', options: ['随机发货', '指定款'] }
]);

const products = [
  { category_id: 1, name: '圣诞熊猫玩偶挂件', description: '可爱熊猫造型，圣诞主题装饰，毛绒材质，可挂在包包上', price: 29, stock: 200, specs: giftSpecs },
  { category_id: 1, name: '川川熊猫盲盒', description: '随机款式小熊猫手办，收集乐趣，桌面摆件', price: 29, stock: 200, specs: giftSpecs },
  { category_id: 1, name: '圣诞毛绒挂件（一套4个）', description: '圣诞主题毛绒小挂件，包含圣诞老人、雪人、麋鹿、圣诞树', price: 19.9, stock: 200, specs: giftSpecs },
  { category_id: 1, name: '小熊猫拍拍', description: '解压神器，柔软可捏，缓解压力，可爱造型', price: 28, stock: 200, specs: giftSpecs },
  { category_id: 1, name: '花花熊猫头零钱包', description: '熊猫造型零钱包，小巧便携，可放零钱和钥匙', price: 22, stock: 200, specs: giftSpecs },
  { category_id: 1, name: '熊猫小挂件', description: '迷你熊猫挂件，多种颜色可选，送礼佳品', price: 15, stock: 200, specs: giftSpecs },
  { category_id: 1, name: '熊猫马克杯', description: '陶瓷材质，熊猫图案，容量350ml，带杯盖', price: 35, stock: 200, specs: giftSpecs },
  { category_id: 1, name: '熊猫帆布袋', description: '环保帆布材质，熊猫印花，大容量，日常通勤必备', price: 25, stock: 200, specs: giftSpecs },

  { category_id: 2, name: '埃塞俄比亚耶加雪菲', description: '花香果酸，柑橘风味，中浅烘焙，单品手冲', price: 38, stock: 200, specs: pourSpecs },
  { category_id: 2, name: '哥伦比亚慧兰', description: '坚果巧克力，醇厚顺滑，中烘焙，经典风味', price: 35, stock: 200, specs: pourSpecs },
  { category_id: 2, name: '肯尼亚AA', description: '黑醋栗酸质，红酒余韵，中浅烘焙，果酸明亮', price: 42, stock: 200, specs: pourSpecs },
  { category_id: 2, name: '危地马拉安提瓜', description: '烟熏香料，可可风味，中深烘焙，口感浓郁', price: 36, stock: 200, specs: pourSpecs },
  { category_id: 2, name: '巴拿马瑰夏', description: '茉莉花香，蜂蜜甜感，浅烘焙，精品豆种', price: 68, stock: 100, specs: pourSpecs },
  { category_id: 2, name: '云南小粒咖啡', description: '国产精品，焦糖甜感，中烘焙，性价比高', price: 28, stock: 300, specs: pourSpecs },
  { category_id: 2, name: '曼特宁G1', description: '草本香料，低酸醇厚，深烘焙，经典印尼风味', price: 40, stock: 200, specs: pourSpecs },
  { category_id: 2, name: '巴西喜拉多', description: '坚果奶油，平衡顺滑，中烘焙，日常首选', price: 32, stock: 250, specs: pourSpecs },

  { category_id: 3, name: '提拉米苏', description: '经典意式甜品，马斯卡彭芝士，咖啡酒浸润，层次丰富', price: 32, stock: 50, specs: cakeSpecs },
  { category_id: 3, name: '抹茶千层', description: '日式抹茶奶油，20层薄饼，清新不腻', price: 35, stock: 50, specs: cakeSpecs },
  { category_id: 3, name: '巴斯克芝士蛋糕', description: '焦香表皮，流心内里，浓郁芝士，网红爆款', price: 38, stock: 50, specs: cakeSpecs },
  { category_id: 3, name: '巧克力熔岩蛋糕', description: '外层松软，内馅流心，搭配香草冰淇淋', price: 36, stock: 50, specs: cakeSpecs },
  { category_id: 3, name: '草莓奶油蛋糕', description: '新鲜草莓，动物奶油，松软戚风，季节限定', price: 34, stock: 50, specs: cakeSpecs },
  { category_id: 3, name: '柠檬塔', description: '酸甜柠檬馅，酥脆塔皮，清爽解腻', price: 28, stock: 50, specs: cakeSpecs },
  { category_id: 3, name: '红丝绒蛋糕', description: '经典美式，奶油芝士霜，口感绵密', price: 33, stock: 50, specs: cakeSpecs },
  { category_id: 3, name: '栗子蒙布朗', description: '法式经典，栗子泥细腻，奶油香滑', price: 40, stock: 50, specs: cakeSpecs },

  { category_id: 4, name: '圣诞姜饼人拿铁', description: '姜饼风味糖浆，肉桂粉装饰，温暖节日氛围', price: 36, original_price: 42, stock: 999, specs: coffeeSpecs },
  { category_id: 4, name: '圣诞树抹茶拿铁', description: '抹茶基底，草莓酱点缀，圣诞树造型拉花', price: 38, original_price: 44, stock: 999, specs: coffeeSpecs },
  { category_id: 4, name: '热红酒美式', description: '红酒风味糖浆，橙片肉桂装饰，无酒精', price: 35, original_price: 40, stock: 999, specs: coffeeSpecs },
  { category_id: 4, name: '圣诞布丁蛋糕', description: '传统英式布丁，干果丰富，搭配白兰地酱', price: 42, stock: 30, specs: cakeSpecs },
  { category_id: 4, name: '雪人棉花糖可可', description: '热可可基底，雪人棉花糖，巧克力装饰', price: 32, stock: 999, specs: coffeeSpecs },
  { category_id: 4, name: '圣诞花环曲奇', description: '抹茶曲奇圈，蔓越莓装饰，酥脆可口', price: 25, stock: 100, specs: null },
  { category_id: 4, name: '驯鹿摩卡', description: '摩卡咖啡，驯鹿造型拉花，巧克力角装饰', price: 36, stock: 999, specs: coffeeSpecs },
  { category_id: 4, name: '圣诞礼盒（咖啡+甜点）', description: '精选挂耳咖啡+手工饼干，节日送礼首选', price: 88, original_price: 108, stock: 50, specs: null },

  { category_id: 5, name: '美式咖啡', description: '浓缩咖啡+热水，经典黑咖，清爽提神', price: 22, stock: 999, specs: coffeeSpecs },
  { category_id: 5, name: '拿铁', description: '浓缩咖啡+蒸汽牛奶，奶泡绵密，经典之选', price: 28, stock: 999, specs: coffeeSpecs },
  { category_id: 5, name: '卡布奇诺', description: '浓缩咖啡+厚奶泡，可可粉撒面，意式经典', price: 28, stock: 999, specs: coffeeSpecs },
  { category_id: 5, name: '澳白（Flat White）', description: '浓缩咖啡+薄奶泡，咖啡味更浓，丝滑口感', price: 30, stock: 999, specs: coffeeSpecs },
  { category_id: 5, name: '焦糖玛奇朵', description: '香草糖浆+牛奶+浓缩+焦糖酱，层次丰富', price: 32, stock: 999, specs: coffeeSpecs },
  { category_id: 5, name: '摩卡', description: '巧克力酱+浓缩+牛奶+奶油，甜蜜满足', price: 32, stock: 999, specs: coffeeSpecs },
  { category_id: 5, name: '浓缩咖啡（Espresso）', description: '双份浓缩，浓郁醇厚，咖啡爱好者首选', price: 18, stock: 999, specs: coffeeSpecs },
  { category_id: 5, name: '短笛（Piccolo）', description: '迷你拿铁，浓缩比例高，浓郁奶香', price: 26, stock: 999, specs: coffeeSpecs },

  { category_id: 6, name: '桂花拿铁', description: '桂花糖浆+拿铁，花香四溢，秋日限定', price: 34, stock: 999, specs: coffeeSpecs },
  { category_id: 6, name: '椰香斑斓拿铁', description: '椰奶+斑斓糖浆，东南亚风情，清新独特', price: 36, stock: 999, specs: coffeeSpecs },
  { category_id: 6, name: '海盐焦糖拿铁', description: '海盐焦糖酱，咸甜交织，口感丰富', price: 35, stock: 999, specs: coffeeSpecs },
  { category_id: 6, name: '燕麦拿铁', description: 'OATLY燕麦奶，植物基底，健康低脂', price: 32, stock: 999, specs: coffeeSpecs },
  { category_id: 6, name: '玫瑰荔枝美式', description: '玫瑰糖浆+荔枝汁+美式，花香果香融合', price: 38, stock: 999, specs: coffeeSpecs },
  { category_id: 6, name: '黑糖珍珠拿铁', description: '黑糖珍珠+拿铁，Q弹有嚼劲，台式风味', price: 36, stock: 999, specs: coffeeSpecs },
  { category_id: 6, name: '橙香美式', description: '鲜榨橙汁+美式，果香清新，夏日特调', price: 34, stock: 999, specs: coffeeSpecs },
  { category_id: 6, name: '薄荷摩卡', description: '薄荷糖浆+摩卡，清凉提神，独特体验', price: 35, stock: 999, specs: coffeeSpecs },

  { category_id: 7, name: '茉莉奶绿', description: '茉莉绿茶+牛奶，花香清新，经典奶茶', price: 26, stock: 999, specs: coffeeSpecs },
  { category_id: 7, name: '伯爵红茶拿铁', description: '伯爵茶+牛奶，佛手柑香气，英式优雅', price: 28, stock: 999, specs: coffeeSpecs },
  { category_id: 7, name: '乌龙拿铁', description: '铁观音乌龙茶+牛奶，茶香浓郁，回甘悠长', price: 28, stock: 999, specs: coffeeSpecs },
  { category_id: 7, name: '抹茶拿铁', description: '日本宇治抹茶+牛奶，清新微苦，健康之选', price: 30, stock: 999, specs: coffeeSpecs },
  { category_id: 7, name: '水果茶（季节款）', description: '新鲜水果+茉莉茶底，维C满满，清爽解渴', price: 32, stock: 999, specs: coffeeSpecs },
  { category_id: 7, name: '柠檬红茶', description: '锡兰红茶+新鲜柠檬，经典港式风味', price: 24, stock: 999, specs: coffeeSpecs },
  { category_id: 7, name: '白桃乌龙', description: '白桃果香+乌龙茶香，甜美清新，少女最爱', price: 30, stock: 999, specs: coffeeSpecs },
  { category_id: 7, name: '普洱奶茶', description: '陈年普洱+牛奶，醇厚顺滑，养生之选', price: 28, stock: 999, specs: coffeeSpecs },

  { category_id: 8, name: '香草冰淇淋', description: '经典香草风味，奶香浓郁，口感顺滑', price: 18, stock: 999, specs: iceCreamSpecs },
  { category_id: 8, name: '巧克力冰淇淋', description: '比利时巧克力，浓郁醇厚，巧克力控最爱', price: 20, stock: 999, specs: iceCreamSpecs },
  { category_id: 8, name: '抹茶冰淇淋', description: '宇治抹茶制作，微苦回甘，日式风味', price: 22, stock: 999, specs: iceCreamSpecs },
  { category_id: 8, name: '草莓冰淇淋', description: '新鲜草莓制作，果香自然，酸甜可口', price: 22, stock: 999, specs: iceCreamSpecs },
  { category_id: 8, name: '芒果雪芭', description: '纯芒果制作，不含奶，清爽低脂', price: 24, stock: 999, specs: iceCreamSpecs },
  { category_id: 8, name: '咖啡阿芙佳朵', description: '香草冰淇淋+浓缩咖啡浇淋，冰火交融', price: 28, stock: 999, specs: iceCreamSpecs },
  { category_id: 8, name: '双球冰淇淋杯', description: '任选两种口味，搭配脆筒和水果', price: 32, stock: 999, specs: iceCreamSpecs },
  { category_id: 8, name: '冰淇淋华夫饼', description: '现烤华夫饼+冰淇淋球+水果，甜蜜满足', price: 38, stock: 999, specs: iceCreamSpecs }
];

const productImages = [
  '/uploads/products/圣诞熊猫玩偶挂件.png',
  '/uploads/products/川川熊猫盲盒.png',
  '/uploads/products/圣诞毛绒挂件.png',
  '/uploads/products/小熊猫拍拍.png',
  '/uploads/products/花花熊猫头零钱包.png',
  '/uploads/products/熊猫小挂件.png',
  '/uploads/products/熊猫马克杯.png',
  '/uploads/products/熊猫帆布袋.png',
  '/uploads/products/埃塞俄比亚耶加雪菲.png',
  '/uploads/products/哥伦比亚慧兰.png',
  '/uploads/products/肯尼迪AA.png',
  '/uploads/products/危地马拉安提瓜.png',
  '/uploads/products/巴拿马瑰夏.png',
  '/uploads/products/云南小粒咖啡.png',
  '/uploads/products/曼特宁G1.png',
  '/uploads/products/巴西喜拉多.png',
  '/uploads/products/提拉米苏.png',
  '/uploads/products/抹茶千层.png',
  '/uploads/products/巴斯克芝士蛋糕.png',
  '/uploads/products/巧克力熔岩蛋糕.png',
  '/uploads/products/草莓奶油蛋糕.png',
  '/uploads/products/柠檬塔.png',
  '/uploads/products/红丝绒蛋糕.png',
  '/uploads/products/栗子蒙布朗.png',
  '/uploads/products/圣诞姜饼人拿铁.png',
  '/uploads/products/圣诞树抹茶拿铁.png',
  '/uploads/products/热红酒美式.png',
  '/uploads/products/圣诞布丁蛋糕.png',
  '/uploads/products/雪人棉花糖可可.png',
  '/uploads/products/圣诞花环曲奇.png',
  '/uploads/products/驯鹿摩卡.png',
  '/uploads/products/圣诞礼盒（咖啡+甜点）.png',
  '/uploads/products/美式咖啡.png',
  '/uploads/products/原味拿铁.png',
  '/uploads/products/卡布奇诺.png',
  '/uploads/products/澳白.png',
  '/uploads/products/焦糖玛奇朵.png',
  '/uploads/products/摩卡.png',
  '/uploads/products/浓缩咖啡.png',
  '/uploads/products/短笛.png',
  '/uploads/products/桂花natie.png',
  '/uploads/products/椰香斑斓拿铁.png',
  '/uploads/products/海盐焦糖拿铁.png',
  '/uploads/products/燕麦拿铁.png',
  '/uploads/products/玫瑰离职美式.png',
  '/uploads/products/黑糖珍珠拿铁.png',
  '/uploads/products/橙香美式.png',
  '/uploads/products/薄荷摩卡.png',
  '/uploads/products/茉莉奶绿.png',
  '/uploads/products/伯爵红茶拿铁.png',
  '/uploads/products/乌龙拿铁.png',
  '/uploads/products/抹茶拿铁.png',
  '/uploads/products/水果茶（季节款）.png',
  '/uploads/products/柠檬红茶.png',
  '/uploads/products/白桃乌龙.png',
  '/uploads/products/普洱奶茶.png',
  '/uploads/products/香草冰淇淋.png',
  '/uploads/products/巧克力冰淇淋.png',
  '/uploads/products/抹茶冰淇淋.png',
  '/uploads/products/草莓冰淇淋.png',
  '/uploads/products/芒果雪芭.png',
  '/uploads/products/咖啡阿芙佳朵.png',
  '/uploads/products/双球冰淇淋杯.png',
  '/uploads/products/冰淇淋华夫饼.png'
];

const memberLevels = [
  { id: 0, name: '普通会员', min_amount: 0, discount: 1.0, point_rate: 1 },
  { id: 1, name: '银卡会员', min_amount: 200, discount: 0.95, point_rate: 2 },
  { id: 2, name: '金卡会员', min_amount: 500, discount: 0.9, point_rate: 3 },
  { id: 3, name: '黑卡会员', min_amount: 1000, discount: 0.85, point_rate: 5 }
];

const banners = [
  { image_url: '/uploads/banners/banner1.png', title: '圣诞限定新品上市', link_type: 1, link_value: '4', sort_order: 1, is_show: 1 },
  { image_url: '/uploads/banners/banner2.png', title: '巴拿马瑰夏 手冲体验', link_type: 2, link_value: '5', sort_order: 2, is_show: 1 },
  { image_url: '/uploads/banners/banner3.png', title: '新用户专享 满30减5', link_type: 3, link_value: '1', sort_order: 3, is_show: 1 },
  { image_url: '/uploads/banners/banner4.png', title: '熊猫周边 限时特惠', link_type: 1, link_value: '1', sort_order: 4, is_show: 1 }
];

const stores = [
  { name: '熊猫咖啡·春熙路店', address: '成都市锦江区春熙路88号1楼', phone: '028-88886666', business_hours: '08:00-22:00', images: JSON.stringify(['/uploads/stores/store1.png']), status: 1, latitude: 30.65746, longitude: 104.08139, rating: 4.9, reviews: 2380 },
  { name: '熊猫咖啡·太古里店', address: '成都市锦江区中纱帽街8号成都远洋太古里1层', phone: '028-88887777', business_hours: '09:00-22:30', images: JSON.stringify(['/uploads/stores/store2.png']), status: 1, latitude: 30.64617, longitude: 104.08691, rating: 4.8, reviews: 1856 },
  { name: '熊猫咖啡·宽窄巷子店', address: '成都市青羊区宽巷子22号', phone: '028-88888888', business_hours: '08:30-21:30', images: JSON.stringify(['/uploads/stores/store3.png']), status: 1, latitude: 30.66977, longitude: 104.05554, rating: 4.7, reviews: 1520 },

  { name: '熊猫咖啡·王府井店', address: '北京市东城区王府井大街138号', phone: '010-66661111', business_hours: '08:00-22:00', images: JSON.stringify(['/uploads/stores/store4.png']), status: 1, latitude: 39.91419, longitude: 116.41031, rating: 4.8, reviews: 2100 },
  { name: '熊猫咖啡·三里屯店', address: '北京市朝阳区三里屯路19号太古里南区', phone: '010-66662222', business_hours: '09:00-23:00', images: JSON.stringify(['/uploads/stores/store5.png']), status: 1, latitude: 39.93428, longitude: 116.45401, rating: 4.9, reviews: 2680 },
  { name: '熊猫咖啡·西单店', address: '北京市西城区西单北大街176号', phone: '010-66663333', business_hours: '08:30-22:00', images: JSON.stringify(['/uploads/stores/store6.png']), status: 1, latitude: 39.90964, longitude: 116.37376, rating: 4.6, reviews: 1340 },

  { name: '熊猫咖啡·张掖路店', address: '兰州市城关区张掖路步行街66号', phone: '0931-8881111', business_hours: '08:00-22:00', images: JSON.stringify(['/uploads/stores/store7.png']), status: 1, latitude: 36.05694, longitude: 103.83430, rating: 4.7, reviews: 980 },
  { name: '熊猫咖啡·东方红广场店', address: '兰州市城关区东岗西路1号', phone: '0931-8882222', business_hours: '08:30-21:30', images: JSON.stringify(['/uploads/stores/store8.png']), status: 1, latitude: 36.05700, longitude: 103.83600, rating: 4.5, reviews: 760 },
  { name: '熊猫咖啡·正宁路店', address: '兰州市城关区正宁路夜市旁12号', phone: '0931-8883333', business_hours: '09:00-22:30', images: JSON.stringify(['/uploads/stores/store9.png']), status: 1, latitude: 36.05200, longitude: 103.83000, rating: 4.8, reviews: 1120 },

  { name: '熊猫咖啡·西湖店', address: '杭州市上城区南山路88号', phone: '0571-88881111', business_hours: '08:00-22:00', images: JSON.stringify(['/uploads/stores/store10.png']), status: 1, latitude: 30.24288, longitude: 120.14873, rating: 4.9, reviews: 2560 },
  { name: '熊猫咖啡·龙翔桥店', address: '杭州市上城区延安路258号', phone: '0571-88882222', business_hours: '08:30-22:30', images: JSON.stringify(['/uploads/stores/store11.png']), status: 1, latitude: 30.24688, longitude: 120.16901, rating: 4.7, reviews: 1890 },
  { name: '熊猫咖啡·武林广场店', address: '杭州市下城区体育场路228号', phone: '0571-88883333', business_hours: '09:00-22:00', images: JSON.stringify(['/uploads/stores/store12.png']), status: 1, latitude: 30.27634, longitude: 120.16389, rating: 4.6, reviews: 1280 },

  { name: '熊猫咖啡·武城街店', address: '张家口市桥西区武城街55号', phone: '0313-8881111', business_hours: '08:00-21:30', images: JSON.stringify(['/uploads/stores/store13.png']), status: 1, latitude: 40.76901, longitude: 114.87901, rating: 4.5, reviews: 680 },
  { name: '熊猫咖啡·宣化南大街店', address: '张家口市宣化区南大街38号', phone: '0313-8882222', business_hours: '08:30-21:30', images: JSON.stringify(['/uploads/stores/store14.png']), status: 1, latitude: 40.60600, longitude: 115.06300, rating: 4.6, reviews: 520 },
  { name: '熊猫咖啡·崇礼店', address: '张家口市崇礼区裕兴路18号', phone: '0313-8883333', business_hours: '09:00-21:00', images: JSON.stringify(['/uploads/stores/store15.png']), status: 1, latitude: 40.97000, longitude: 115.28000, rating: 4.7, reviews: 890 },

  { name: '熊猫咖啡·肃州路店', address: '酒泉市肃州区肃州路16号', phone: '0937-8881111', business_hours: '08:30-21:00', images: JSON.stringify(['/uploads/stores/store16.png']), status: 1, latitude: 39.73200, longitude: 98.49400, rating: 4.5, reviews: 560 },
  { name: '熊猫咖啡·鼓楼店', address: '酒泉市肃州区鼓楼东街8号', phone: '0937-8882222', business_hours: '08:00-21:30', images: JSON.stringify(['/uploads/stores/store17.png']), status: 1, latitude: 39.74200, longitude: 98.50800, rating: 4.6, reviews: 720 },
  { name: '熊猫咖啡·玉门路店', address: '酒泉市肃州区玉门东路22号', phone: '0937-8883333', business_hours: '09:00-21:00', images: JSON.stringify(['/uploads/stores/store18.png']), status: 1, latitude: 39.72500, longitude: 98.48000, rating: 4.4, reviews: 430 }
];

const coupons = [
  { name: '新用户专享 满30减5', type: 1, value: 5, min_amount: 30, valid_days: 30, total_count: 1000, remain_count: 1000 },
  { name: '咖啡爱好者 满50减10', type: 1, value: 10, min_amount: 50, valid_days: 15, total_count: 500, remain_count: 500 },
  { name: '会员日 9折优惠', type: 2, value: 0.9, min_amount: 20, valid_days: 7, total_count: 300, remain_count: 300 },
  { name: '圣诞特惠 满80减15', type: 1, value: 15, min_amount: 80, valid_days: 30, total_count: 200, remain_count: 200 },
  { name: '下午茶时光 满40减8', type: 1, value: 8, min_amount: 40, valid_days: 10, total_count: 600, remain_count: 600 }
];

async function seed() {
  try {
    console.log('正在同步数据库...');
    await db.sequelize.sync({ force: true });
    console.log('数据库同步完成');

    console.log('正在插入会员等级...');
    await db.MemberLevel.bulkCreate(memberLevels);

    console.log('正在插入商品分类...');
    await db.Category.bulkCreate(categories);

    console.log('正在插入商品数据...');
    const productsWithImage = products.map((p, i) => ({
      ...p,
      main_image: productImages[i] || productImages[0],
      images: JSON.stringify([productImages[i] || productImages[0]]),
      sales: Math.floor(Math.random() * 500 + 100)
    }));
    await db.Product.bulkCreate(productsWithImage);

    console.log('正在插入轮播图...');
    await db.Banner.bulkCreate(banners);

    console.log('正在插入门店...');
    await db.Store.bulkCreate(stores);

    console.log('正在插入优惠券...');
    await db.Coupon.bulkCreate(coupons);

    console.log('种子数据初始化完成！');
    console.log(`- 分类: ${categories.length}个`);
    console.log(`- 商品: ${products.length}个`);
    console.log(`- 轮播图: ${banners.length}条`);
    console.log(`- 门店: ${stores.length}家`);
    console.log(`- 会员等级: ${memberLevels.length}个`);
    console.log(`- 优惠券: ${coupons.length}张`);

    process.exit(0);
  } catch (err) {
    console.error('种子数据初始化失败:', err);
    process.exit(1);
  }
}

seed();
