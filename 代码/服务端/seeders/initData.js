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
  'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Adorable%20panda%20plush%20keychain%20Christmas%20theme%20cute%20toy%20product%20photo%20white%20background&image_size=square',
  'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Panda%20blind%20box%20figure%20collectible%20toy%20kawaii%20style%20product%20photo&image_size=square',
  'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Set%20of%204%20Christmas%20plush%20ornaments%20Santa%20snowman%20reindeer%20tree%20cute%20product&image_size=square',
  'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Squishy%20panda%20stress%20relief%20toy%20soft%20cute%20brown%20product%20photo&image_size=square',
  'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Panda%20head%20coin%20purse%20wallet%20small%20cute%20accessory%20product&image_size=square',
  'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Mini%20panda%20charm%20keychain%20colorful%20cute%20accessory%20product&image_size=square',
  'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Ceramic%20coffee%20mug%20with%20panda%20design%20350ml%20white%20product%20photo&image_size=square',
  'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Canvas%20tote%20bag%20with%20panda%20print%20eco%20friendly%20beige%20product&image_size=square',
  'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Pour%20over%20coffee%20Ethiopian%20Yirgacheffe%20drip%20coffee%20artisan%20brewing&image_size=square',
  'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Hand%20drip%20coffee%20Colombian%20Huila%20pour%20over%20craft%20coffee&image_size=square',
  'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Kenya%20AA%20pour%20over%20coffee%20hand%20drip%20specialty%20beans&image_size=square',
  'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Guatemala%20Antigua%20pour%20over%20coffee%20dark%20roast%20hand%20brewed&image_size=square',
  'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Panama%20Geisha%20pour%20over%20coffee%20premium%20specialty%20rare&image_size=square',
  'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Yunnan%20small%20bean%20coffee%20pour%20over%20Chinese%20origin%20arabica&image_size=square',
  'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Mandheling%20G1%20Indonesian%20coffee%20pour%20over%20dark%20bold&image_size=square',
  'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Brazil%20Cerrado%20pour%20over%20coffee%20nutty%20smooth%20balanced&image_size=square',
  'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Tiramisu%20dessert%20Italian%20classic%20mascarpone%20cocoa%20dusting%20slice&image_size=square',
  'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Matcha%20mille%20crepe%20cake%20Japanese%20green%20tea%20layers%20elegant&image_size=square',
  'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Basque%20burnt%20cheesecake%20gooey%20center%20golden%20crust%20popular&image_size=square',
  'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Molten%20lava%20chocolate%20cake%20flowing%20center%20decadent%20rich&image_size=square',
  'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Strawberry%20cream%20cake%20fresh%20berries%20whipped%20cream%20sponge&image_size=square',
  'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Lemon%20tart%20dessert%20citrus%20curd%20flaky%20crust%20French%20pastry&image_size=square',
  'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Red%20velvet%20cake%20cream%20cheese%20frosting%20American%20classic%20slice&image_size=square',
  'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Mont%20Blanc%20chestnut%20cake%20French%20pastry%20verrines%20elegant&image_size=square',
  'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Gingerbread%20man%20latte%20Christmas%20holiday%20drink%20festive%20warm&image_size=square',
  'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Christmas%20tree%20matcha%20latte%20green%20holiday%20drink%20art&image_size=square',
  'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Mulled%20wine%20Americano%20coffee%20orange%20cinnamon%20winter%20warm&image_size=square',
  'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Christmas%20pudding%20cake%20British%20traditional%20dried%20fruits%20brandy&image_size=square',
  'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Snowman%20marshmallow%20hot%20chocolate%20winter%20drink%20cute%20cozy&image_size=square',
  'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Christmas%20wreath%20matcha%20cookies%20cranberry%20holiday%20biscuits&image_size=square',
  'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Reindeer%20mocha%20coffee%20Christmas%20latte%20art%20chocolate%20holiday&image_size=square',
  'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Christmas%20gift%20box%20coffee%20cookies%20festive%20red%20ribbon%20premium&image_size=square',
  'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Americano%20coffee%20black%20coffee%20classic%20clean%20cup%20minimal&image_size=square',
  'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Latte%20coffee%20with%20latte%20art%20heart%20pattern%20creamy%20white%20cup&image_size=square',
  'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Cappuccino%20coffee%20thick%20foam%20cocoa%20powder%20Italian%20classic&image_size=square',
  'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Flat%20White%20coffee%20Australian%20strong%20microfoam%20smooth%20cup&image_size=square',
  'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Caramel%20macchiato%20coffee%20drizzled%20caramel%20sweet%20layers&image_size=square',
  'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Mocha%20coffee%20chocolate%20whipped%20cream%20rich%20sweet%20indulgent&image_size=square',
  'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Double%20espresso%20shot%20dark%20rich%20intense%20crema%20small%20cup&image_size=square',
  'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Piccolo%20latte%20mini%20coffee%20strong%20ratio%20small%20glass%20cup&image_size=square',
  'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Osmanthus%20latte%20coffee%20flower%20fragrant%20autumn%20seasonal%20golden&image_size=square',
  'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Coconut%20pandan%20latte%20Southeast%20Asian%20tropical%20green%20fresh&image_size=square',
  'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Sea%20salt%20caramel%20latte%20coffee%20sweet%20savory%20layers%20gourmet&image_size=square',
  'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Oat%20milk%20latte%20oatly%20plant%20based%20healthy%20creamy%20modern&image_size=square',
  'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Rose%20lychee%20Americano%20floral%20fruit%20pink%20refreshing%20elegant&image_size=square',
  'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Brown%20sugar%20bubble%20milk%20latte%20tapioca%20pearls%20Taiwanese%20drink&image_size=square',
  'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Orange%20Americano%20coffee%20citrus%20fresh%20juice%20summer%20vibrant&image_size=square',
  'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Mint%20mocha%20coffee%20cooling%20refreshing%20chocolate%20minty%20unique&image_size=square',
  'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Jasmine%20milk%20tea%20green%20tea%20floral%20fragrant%20creamy%20classic&image_size=square',
  'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Earl%20Grey%20tea%20latte%20bergamot%20English%20elegant%20creamy%20drink&image_size=square',
  'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Oolong%20tea%20latte%20Tieguanyin%20milky%20Chinese%20tea%20aromatic&image_size=square',
  'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Matcha%20latte%20Uji%20Japanese%20green%20tea%20vibrant%20green%20healthy&image_size=square',
  'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Fruit%20tea%20seasonal%20mixed%20fruits%20jasmine%20base%20colorful%20refreshing&image_size=square',
  'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Lemon%20black%20tea%20Hong%20Kong%20style%20Ceylon%20citus%20tangy&image_size=square',
  'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=White%20peach%20oolong%20tea%20drink%20sweet%20fruity%20pastel%20pink&image_size=square',
  'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Puer%20milk%20tea%20aged%20fermented%20earthy%20creamy%20wellness&image_size=square',
  'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Vanilla%20ice%20cream%20scoop%20classic%20creamy%20soft%20serve%20dessert&image_size=square',
  'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Chocolate%20ice%20cream%20Belgian%20dark%20rich%20indulgent%20scoop&image_size=square',
  'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Matcha%20ice%20cream%20green%20tea%20Japanese%20Uji%20bitter%20sweet&image_size=square',
  'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Strawberry%20ice%20cream%20fresh%20fruit%20pink%20sweet%20tart%20scoop&image_size=square',
  'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Mango%20sorbet%20frozen%20dairy%20free%20tropical%20yellow%20refreshing&image_size=square',
  'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Affogato%20dessert%20vanilla%20ice%20cream%20espresso%20shot%20Italian&image_size=square',
  'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Two%20scoop%20ice%20cream%20cup%20double%20flavor%20with%20toppings&image_size=square',
  'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Waffle%20with%20ice%20cream%20scoop%20fresh%20fruit%20belgian%20waffle%20dessert&image_size=square'
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
  { name: '熊猫咖啡·春熙路店', address: '成都市锦江区春熙路88号1楼', phone: '028-88886666', business_hours: '08:00-22:00', images: JSON.stringify(['/uploads/stores/store1.jpg']), status: 1 },
  { name: '熊猫咖啡·太古里店', address: '成都市锦江区中纱帽街8号成都远洋太古里1层', phone: '028-88887777', business_hours: '09:00-22:30', images: JSON.stringify(['/uploads/stores/store2.jpg']), status: 1 },
  { name: '熊猫咖啡·宽窄巷子店', address: '成都市青羊区宽巷子22号', phone: '028-88888888', business_hours: '08:30-21:30', images: JSON.stringify(['/uploads/stores/store3.jpg']), status: 1 }
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
