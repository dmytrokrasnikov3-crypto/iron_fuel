import { SupplementProduct, DiscountedProduct, AccessoryProduct } from '../models/Product';

export const initialProducts = [
    new SupplementProduct(
        1,
        '100% Whey Gold Standard',
        64.99,
        'Protein',
        '',
        'Преміальний сироватковий ізолят та концентрат.',
        '30g',
        74,
        'Double Rich Chocolate'
    ),
    new SupplementProduct(
        2,
        'IsoFlex Whey Protein Isolate',
        72.50,
        'Protein',
        '',        'Ультрачистий ізолят сироваткового протеїну з нульовим вмістом цукру.',
        '30g',
        75,
        'Vanilla Ice Cream'
    ),
    new SupplementProduct(
        3,
        'Casein Night Repair Protein',
        58.00,
        'Protein',
        '',        'Повільний міцелярний казеїн для підживлення мʼязів під час сну.',
        '33g',
        55,
        'Strawberry Cream'
    ),
    new SupplementProduct(
        4,
        'Plant Organic Vegan Protein',
        49.99,
        'Protein',
        '',        'Органічний рослинний протеїн із гороху та горошку бета.',
        '35g',
        40,
        'Salted Caramel'
    ),

    new SupplementProduct(
        5,
        'Creatine Monohydrate Unflavored',
        29.99,
        'Creatine',
        '',        'Чистий мікронізований креатин моногідрат для збільшення сили.',
        '5g',
        100,
        'Unflavored'
    ),
    new SupplementProduct(
        6,
        'Creatine HCL Max Power',
        36.50,
        'Creatine',
        '',        'Гідрохлорид креатину з високою засвоюваністю без затримки води.',
        '3g',
        90,
        'Lemon Lime'
    ),
    new SupplementProduct(
        7,
        'Tri-Creatine Malate Blast',
        32.00,
        'Creatine',
        '',        'Креатин малат для підвищення витривалості та енергії.',
        '5g',
        80,
        'Fruit Punch'
    ),

    new DiscountedProduct(
        8,
        'BCAA Energy Boost 2:1:1',
        34.99,
        'Amino acids',
        '',        'Комплекс незамінних амінокислот із додаванням природного кофеїну.',
        20
    ),
    new SupplementProduct(
        9,
        'Essential EAA Intra-Workout',
        39.99,
        'Amino acids',
        '',        'Повний спектр 9 незамінних амінокислот для підтримки під час тренувань.',
        '12g',
        30,
        'Blue Raspberry'
    ),
    new SupplementProduct(
        10,
        'L-Glutamine Micronized Powder',
        24.99,
        'Amino acids',
        '',        'Амінокислота глутамін для швидкого відновлення та імунітету.',
        '5g',
        60,
        'Unflavored'
    ),

    new SupplementProduct(
        11,
        'Hydrolyzed Collagen Peptides',
        42.00,
        'Collagen',
        '',        'Гідролізований морський колаген для суглобів та шкіри.',
        '10g',
        30,
        'Neutral'
    ),
    new SupplementProduct(
        12,
        'Collagen + Vitamin C Complex',
        38.50,
        'Collagen',
        '',        'Пептиди колагену з вітаміном C для покращеного засвоєння.',
        '11g',
        30,
        'Orange Burst'
    ),
    new SupplementProduct(
        13,
        'Beauty Collagen Powder',
        45.00,
        'Collagen',
        '',        'Колагеновий комплекс із гіалуроновою кислотою та біотином.',
        '12g',
        25,
        'Wild Berry'
    ),

    new SupplementProduct(
        14,
        'Glucosamine Chondroitin MSM',
        28.99,
        'Joints and bones',
        '',        'Потужний захист та відновлення хрящової тканини.',
        '3 caps',
        40,
        'Capsules'
    ),
    new SupplementProduct(
        15,
        'Calcium Magnesium Zinc + D3',
        19.99,
        'Joints and bones',
        '',        'Мінеральний комплекс для зміцнення кісток та зубів.',
        '2 tabs',
        50,
        'Tablets'
    ),
    new SupplementProduct(
        16,
        'Joint Shield Pro Gelatin',
        31.50,
        'Joints and bones',
        '',        'Рідкий комплекс для профілактики травм суглобів та звʼязок.',
        '25ml',
        20,
        'Green Apple'
    ),

    new SupplementProduct(
        17,
        'Omega-3 Fish Oil 1000mg',
        22.50,
        'Sports supplements for health',
        '',        'Висококонцентровані омега-3 жирні кислоти EPA / DHA.',
        '2 softgels',
        60,
        'Softgels'
    ),
    new SupplementProduct(
        18,
        'Daily Multivitamin Sports Pack',
        35.00,
        'Sports supplements for health',
        '',        'Вітамінно-мінеральний комплекс для активного способу життя.',
        '1 pack',
        30,
        'Packs'
    ),
    new SupplementProduct(
        19,
        'Coenzyme Q10 + Vitamin E',
        27.99,
        'Sports supplements for health',
        '',        'Антиоксидантний захист серця та клітинної енергії.',
        '1 cap',
        60,
        'Capsules'
    ),

    new SupplementProduct(
        20,
        'Mass Gainer Extreme 5000',
        59.99,
        'Weight gainer',
        '',        'Висококалорійний гейнер для швидкого набору мʼязової маси.',
        '150g',
        20,
        'Chocolate Peanut Butter'
    ),
    new SupplementProduct(
        21,
        'Lean Mass Builder Complex',
        54.00,
        'Weight gainer',
        '',        'Гейнер зі складними вуглеводами та високим вмістом білка.',
        '100g',
        25,
        'Cookies & Cream'
    ),
    new SupplementProduct(
        22,
        'Oat & Whey Mega Gainer',
        48.50,
        'Weight gainer',
        '',        'Натуральний гейнер на основі цельнозернового вівса.',
        '120g',
        22,
        'Banana Bread'
    ),

    new SupplementProduct(
        23,
        'Carbo Nox Fast Energy Powder',
        21.99,
        'Carbohydrates',
        '',        'Швидкі вуглеводи для заповнення глікогену під час тренування.',
        '50g',
        20,
        'Lemon'
    ),
    new SupplementProduct(
        24,
        'Cluster Dextrin Intra-Fuel',
        37.99,
        'Carbohydrates',
        '',        'Високорозгалужений циклічний декстрин без важкості в шлунку.',
        '30g',
        33,
        'Unflavored'
    ),
    new SupplementProduct(
        25,
        'Maltodextrin Pure Energy',
        18.50,
        'Carbohydrates',
        '',        'Чистий мальтодекстрин для приготування ізотонічних напоїв.',
        '40g',
        25,
        'Neutral'
    ),

    new SupplementProduct(
        26,
        'Hair Skin & Nails Biotin Complex',
        24.99,
        'Beauty',
        '',        'Формула з біотином, цинком та селеном для краси та росту волосся.',
        '2 gummies',
        30,
        'Gummies'
    ),
    new SupplementProduct(
        27,
        'Hyaluronic Acid Radiance Boost',
        32.00,
        'Beauty',
        '',        'Гіалуронова кислота для зволоження шкіри зсередини.',
        '1 cap',
        60,
        'Capsules'
    ),
    new SupplementProduct(
        28,
        'Detox & Skin Glow Elixir',
        29.50,
        'Beauty',
        '',        'Натуральний антиоксидантний комплекс для сяйва шкіри.',
        '10g',
        30,
        'Peach Tea'
    ),

    new DiscountedProduct(
        29,
        'Thermo Shred Fire Matrix',
        39.99,
        'Fat burner',
        '',        'Потужний термогенний жироспалювач із екстрактом зеленого чаю.',
        15
    ),
    new SupplementProduct(
        30,
        'L-Carnitine 3000 Liquid Shot',
        26.50,
        'Fat burner',
        '',        'Рідкий L-карнітин для транспорту жирних кислот в енергію.',
        '25ml',
        20,
        'Mango Passionfruit'
    ),
    new SupplementProduct(
        31,
        'CLA 1000 Conjugated Linoleic Acid',
        23.00,
        'Fat burner',
        '',        'Конʼюгована лінолева кислота для підтримки стрункої фігури.',
        '1 softgel',
        90,
        'Softgels'
    ),

    new AccessoryProduct(
        32,
        'IronFuel Pro Shaker 700ml',
        12.99,
        'Shaker',
        '',        'Герметичний шейкер із металевою кулькою для ідеального змішування.',
        'BPA-Free Plastic',
        '700ml'
    ),
    new AccessoryProduct(
        33,
        'Stainless Steel Thermal Shaker',
        24.99,
        'Shaker',
        '',        'Термо-шейкер із нержавіючої сталі, що зберігає температуру напою.',
        'Stainless Steel',
        '750ml'
    ),
    new AccessoryProduct(
        34,
        'Mini Smart Compact Shaker',
        9.99,
        'Shaker',
        '',        'Компактний шейкер із додатковим контейнером під порошок та таблетки.',
        'BPA-Free Plastic',
        '500ml'
    )
];