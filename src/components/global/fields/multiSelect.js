import { Select, SelectItem } from "@nextui-org/react";
import React from "react";


const category= [
  {
      "child": [],
      "_id": "66dd5cdf3e6aca7243b79a3b",
      "title": "Test",
      "slug": "test",
      "description": "",
      "status": "publish",
      "images": [
          "https://res.cloudinary.com/ahossain/image/upload/v1725132986/product/monster.png"
      ],
      "parent_category": "",
      "cat_id": "66d3709f3bbcdc000ceaa5dc",
      "total": 0
  },
  {
      "child": [],
      "_id": "66dd5cdf3e6aca7243b79a3c",
      "title": "Food",
      "slug": "food",
      "description": "",
      "status": "publish",
      "images": [
          "https://res.cloudinary.com/ahossain/image/upload/v1725133100/product/nike.jpg"
      ],
      "parent_category": "",
      "cat_id": "66d36e97806fb2000ca4d733",
      "total": 0
  },
  {
      "child": [],
      "_id": "66dd5cdf3e6aca7243b79a3d",
      "title": "abhya",
      "slug": "abhya",
      "description": "sdfsdsd",
      "status": "publish",
      "images": [
          "https://res.cloudinary.com/ahossain/image/upload/v1725108869/product/KakaoTalk_Photo_2024-04-08-11-38-48011.jpg",
          "https://res.cloudinary.com/ahossain/image/upload/v1725351054/product/KakaoTalk_Photo_2024-04-08-11-38-48014.jpg",
          "https://res.cloudinary.com/ahossain/image/upload/v1725351054/product/KakaoTalk_Photo_2024-04-08-11-38-49016.jpg"
      ],
      "parent_category": "",
      "cat_id": "66d1d20d0f6ca1000cbafa54",
      "total": 0
  },
  {
      "child": [],
      "_id": "66dd5cdf3e6aca7243b79a3e",
      "title": "Vapes",
      "slug": "vapes",
      "description": "kjljkl",
      "status": "publish",
      "images": [
          "https://res.cloudinary.com/ahossain/image/upload/v1724957220/product/WhatsAppImage2024-08-26at11.06.54PM.jpg"
      ],
      "parent_category": "",
      "cat_id": "66cfca9db896c6000ce26f8c",
      "total": 0
  },
  {
      "child": [],
      "_id": "66dd5cdf3e6aca7243b79a3f",
      "title": "Biscuits & Cakes",
      "slug": "biscuits-&-cakes",
      "description": "",
      "status": "publish",
      "images": [],
      "parent_category": "",
      "cat_id": "632ac9e94d87ff2494210ba0",
      "total": 0
  },
  {
      "child": [],
      "_id": "66dd5cdf3e6aca7243b79a40",
      "title": "Men",
      "slug": "men",
      "description": "A T-shirt (also spelled tee-shirt or tee shirt), or tee for short, is a style of fabric shirt named after the T shape of its body and sleeves. Traditionally, it has short sleeves and a round neckline, known as a crew neck, which lacks a collar.",
      "status": "publish",
      "images": [
          "https://res.cloudinary.com/ahossain/image/upload/v1682058933/product/CMTHP-COR12-deep-ash-920x920.webp",
          "https://res.cloudinary.com/ahossain/image/upload/v1682058933/product/CMTHP-COR12-turkish-blue-920x920.webp",
          "https://res.cloudinary.com/ahossain/image/upload/v1681478890/product/CMTHP-COR12-black-920x920.webp",
          "https://res.cloudinary.com/ahossain/image/upload/v1682243541/product/60c88fa9379ac-square.jpg",
          "https://res.cloudinary.com/ahossain/image/upload/v1682243541/product/6291b3a8d833d-square.jpg"
      ],
      "parent_category": "",
      "cat_id": "632ab2b64d87ff2494210aa7",
      "total": 0
  },
  {
      "child": [],
      "_id": "66dd5cdf3e6aca7243b79a41",
      "title": "Skin Care",
      "slug": "skin-care",
      "description": "Baby Products are products intended to be used on infants and category under the age of three. Baby products are specially formulated to be mild and non-irritating and use ingredients that are selected for these properties. Baby products include baby shampoos and baby lotions, oils, powders and creams.",
      "status": "publish",
      "images": [
          "https://i.ibb.co/9g7vDQJ/Himalaya-Baby-Powder-100g.jpg",
          "https://i.ibb.co/9g7vDQJ/Himalaya-Baby-Powder-100g.jpg"
      ],
      "parent_category": "",
      "cat_id": "632ab2f04d87ff2494210ad0",
      "total": 0
  },
  {
      "child": [],
      "_id": "66dd5cdf3e6aca7243b79a42",
      "title": "Fresh Vegetable",
      "slug": "fresh-vegetable",
      "description": "Most fresh vegetables are low in calories and have a water content in excess of 70 percent, with only about 3.5 percent protein and less than 1 percent fat. ... The root vegetables include beets, carrots, radishes, sweet potatoes, and turnips. Stem vegetables include asparagus and kohlrabi.",
      "status": "publish",
      "images": [
          "https://i.postimg.cc/ZRynchJY/Green-Leaf-Lettuce-each.jpg",
          "https://res.cloudinary.com/ahossain/image/upload/v1679572584/product/Radicchio-12ct.webp"
      ],
      "parent_category": "",
      "cat_id": "632aca374d87ff2494210bf0",
      "total": 0
  },
  {
      "child": [],
      "_id": "66dd5cdf3e6aca7243b79a43",
      "title": "Fresh Fruits",
      "slug": "fresh-fruits",
      "description": "In a botanical sense, a fruit is the fleshy or dry ripened ovary of a flowering plant, enclosing the seed or seeds. Apricots, bananas, and grapes, as well as bean pods, corn grains, tomatoes, cucumbers, and (in their shells) acorns and almonds, are all technically fruits.",
      "status": "publish",
      "images": [
          "https://i.postimg.cc/MTPyNwQC/Clementine-5ct.jpg"
      ],
      "parent_category": "",
      "cat_id": "632aca454d87ff2494210c00",
      "total": 0
  },
  {
      "child": [],
      "_id": "66dd5cdf3e6aca7243b79a44",
      "title": "Dry Fruits",
      "slug": "dry-fruits",
      "description": "Dried fruit is fruit from which the majority of the original water content has been removed either naturally, through sun drying, or through the use of specialized dryers or dehydrators. ... Nearly half of the dried fruits sold are raisins, followed by dates, prunes, figs, apricots, peaches, apples, and pears.",
      "status": "publish",
      "images": [
          "https://i.postimg.cc/rmbhB56C/Golden-Garden-Love-Plum-220g.jpg"
      ],
      "parent_category": "",
      "cat_id": "632aca3d4d87ff2494210bf8",
      "total": 0
  },
  {
      "child": [],
      "_id": "66dd5cdf3e6aca7243b79a45",
      "title": "Jam & Jelly",
      "slug": "jam-&-jelly",
      "description": "Organic food is food produced by methods complying with the standards of organic farming. Standards vary worldwide, but organic farming features practices that cycle resources, promote ecological balance, and conserve biodiversity.",
      "status": "publish",
      "images": [
          "https://i.postimg.cc/V636DsMm/paka-pape-50-gm-1-kg.webp"
      ],
      "parent_category": "",
      "cat_id": "632ab1e04d87ff2494210a6a",
      "total": 0
  },
  {
      "child": [],
      "_id": "66dd5cdf3e6aca7243b79a46",
      "title": "Fish",
      "slug": "fish",
      "description": "A fish is an animal which lives and breathes in water. All fish are vertebrates (have a backbone) and most breathe through gills and have fins and scales. ... There are three classes of fish: jawless, cartilaginous, and bony. All fish have a backbone.",
      "status": "publish",
      "images": [],
      "parent_category": "",
      "cat_id": "632aca7e4d87ff2494210c34",
      "total": 0
  },
  {
      "child": [],
      "_id": "66dd5cdf3e6aca7243b79a47",
      "title": "Coffee",
      "slug": "coffee",
      "description": "coffee is a brewed drink prepared from roasted coffee beans, the seeds of berries from certain Coffea species. ... coffee is darkly colored, bitter, slightly acidic and has a stimulating effect in humans, primarily due to its caffeine content.",
      "status": "publish",
      "images": [
          "https://i.postimg.cc/DwWJ8cTk/Marley-coffee-coffee-Whole-Beans-Medium-Dark-Espresso-8-oz.jpg"
      ],
      "parent_category": "",
      "cat_id": "632ab0504d87ff24942109d7",
      "total": 0
  },
  {
      "child": [],
      "_id": "66dd5cdf3e6aca7243b79a48",
      "title": "Energy Drinks",
      "slug": "energy-drinks",
      "description": "Energy drink, any beverage that contains high levels of a stimulant ingredient, usually caffeine, as well as sugar and often supplements, such as vitamins or carnitine, and that is promoted as a product capable of enhancing mental alertness and physical performance.",
      "status": "publish",
      "images": [
          "https://i.postimg.cc/7YZXtjg3/Positive-Energy-Energy-Drink-Organic-Coconut-water-12-oz.jpg"
      ],
      "parent_category": "",
      "cat_id": "632ab0454d87ff24942109cc",
      "total": 0
  },
  {
      "child": [],
      "_id": "66dd5cdf3e6aca7243b79a49",
      "title": "Juice",
      "slug": "juice",
      "description": "juice is a drink made from the extraction or pressing of the natural liquid contained in fruit and vegetables. It can also refer to liquids that are flavored with concentrate or other biological food sources, such as meat or seafood, such as clam juice.",
      "status": "publish",
      "images": [
          "https://i.postimg.cc/J4R7f5nc/Robinsons-Pink-Lemonade-juice-Drink-10-fl-oz.jpg"
      ],
      "parent_category": "",
      "cat_id": "632ab0564d87ff24942109df",
      "total": 0
  },
  {
      "child": [],
      "_id": "66dd5cdf3e6aca7243b79a4a",
      "title": "Tea",
      "slug": "tea",
      "description": "tea is an aromatic beverage prepared by pouring hot or boiling water over cured or fresh leaves of Camellia sinensis, an evergreen shrub native to China and East Asia. After water, it is the most widely consumed drink in the world. ... tea has a stimulating effect in humans primarily due to its caffeine content.",
      "status": "publish",
      "images": [
          "https://i.postimg.cc/xCbc7n94/VPK-Organic-Kapha-tea-16-ct.jpg"
      ],
      "parent_category": "",
      "cat_id": "632ab0664d87ff24942109ef",
      "total": 0
  },
  {
      "child": [],
      "_id": "66dd5cdf3e6aca7243b79a4b",
      "title": "Water",
      "slug": "water",
      "description": "water, a substance composed of the chemical elements hydrogen and oxygen and existing in gaseous, liquid, and solid states. It is one of the most plentiful and essential of compounds. A tasteless and odourless liquid at room temperature, it has the important ability to dissolve many other substances.",
      "status": "publish",
      "images": [
          "https://i.postimg.cc/P5QXCNqH/Alhambra-Purified-water-1-Lt.jpg"
      ],
      "parent_category": "",
      "cat_id": "632ab0604d87ff24942109e7",
      "total": 0
  },
  {
      "child": [],
      "_id": "66dd5cdf3e6aca7243b79a4c",
      "title": "Cooking Essentials",
      "slug": "cooking-essentials",
      "description": "Spice mixes are blended spices or herbs. ... Blends such as chili powder, curry powder, herbes de Provence, garlic salt, and other seasoned salts are traditionally sold pre-made by grocers, and sometimes baking blends such as pumpkin pie spice are also available.",
      "status": "publish",
      "images": [
          "https://i.ibb.co/zmh08z4/ACI-Pure-Sugar-1-Kg.jpg"
      ],
      "parent_category": "",
      "cat_id": "632aca0b4d87ff2494210bc4",
      "total": 0
  },
  {
      "child": [],
      "_id": "66dd5cdf3e6aca7243b79a4d",
      "title": "Flour",
      "slug": "flour",
      "description": "flour, finely ground cereal grains or other starchy portions of plants, used in various food products and as a basic ingredient of baked goods. flour made from wheat grains is the most satisfactory  for baked products that require spongy structure. ... The outer layers and internal structures of a kernel of wheat.",
      "status": "publish",
      "images": [
          "https://i.ibb.co/BVHFnLG/Fresh-Atta-2-Kg.jpg"
      ],
      "parent_category": "",
      "cat_id": "632aca184d87ff2494210bd4",
      "total": 0
  },
  {
      "child": [],
      "_id": "66dd5cdf3e6aca7243b79a4e",
      "title": "Oil",
      "slug": "oil",
      "description": "Cooking oil is plant, animal, or synthetic fat used in frying, baking, and other types of cooking. ... Cooking oil is typically a liquid at room temperature, although some oils that contain saturated fat, such as coconut oil, palm oil and palm kernel oil are solid.",
      "status": "publish",
      "images": [
          "https://i.ibb.co/0nzYNB8/Fresh-Soyabean-Oil-5-Ltr.jpg"
      ],
      "parent_category": "",
      "cat_id": "632aca144d87ff2494210bcc",
      "total": 0
  },
  {
      "child": [],
      "_id": "66dd5cdf3e6aca7243b79a4f",
      "title": "Cakes",
      "slug": "cakes",
      "description": "Cake is a form of sweet food made from flour, sugar, and other ingredients, that is usually baked. ... The most commonly used cake ingredients include flour, sugar, eggs, butter or oil or margarine, a liquid, and a leavening agent, such as baking soda or baking powder.",
      "status": "publish",
      "images": [
          "https://i.ibb.co/WgXQg7Y/Dan-Cake-Vanilla-Layer-Cake-25-5-Gm.jpg"
      ],
      "parent_category": "",
      "cat_id": "632ac9ef4d87ff2494210ba8",
      "total": 0
  },
  {
      "child": [],
      "_id": "66dd5cdf3e6aca7243b79a50",
      "title": "Biscuits",
      "slug": "biscuits",
      "description": "A biscuit is a flour-based baked food product. In most countries, particularly in the Commonwealth and Ireland, biscuits are typically hard, flat and unleavened. They are usually sweet and may be made with sugar, chocolate, icing, jam, ginger or cinnamon. They can also be savoury and similar to crackers.",
      "status": "publish",
      "images": [
          "https://i.ibb.co/LkncfJj/Dekko-Ovaltine-Cookies-biscuits-330g.jpg"
      ],
      "parent_category": "",
      "cat_id": "632ac9f64d87ff2494210bb0",
      "total": 0
  },
  {
      "child": [],
      "_id": "66dd5cdf3e6aca7243b79a51",
      "title": "Pickles & Condiments",
      "slug": "pickles-&-condiments",
      "description": "sauce, liquid or semiliquid mixture that is added to a food as it cooks or that is served with it. sauces provide flavour, moisture, and a contrast in texture and colour. They may also serve as a medium in which food is contained, for example, the velouté sauce of creamed chicken.",
      "status": "publish",
      "images": [
          "https://i.postimg.cc/DfdJBnSP/Life-Tomato-Ketchup-330-Gm.jpg"
      ],
      "parent_category": "",
      "cat_id": "62cfad52484d89068aa7a81f",
      "total": 0
  },
  {
      "child": [],
      "_id": "66dd5cdf3e6aca7243b79a52",
      "title": "Bread",
      "slug": "bread",
      "description": "The definition of a breakfast food is a food that is eaten primarily for the first meal of the day commonly including: cereal, toast, eggs, pancakes, waffles, pastries, sausage or bacon. An example of a breakfast food is oatmeal. An example of a breakfast food is french toast with scrambled eggs.",
      "status": "publish",
      "images": [
          "https://i.postimg.cc/Hxc5YkC7/Pita-bread-4-csc7se.jpg"
      ],
      "parent_category": "",
      "cat_id": "632aae7b4d87ff2494210967",
      "total": 0
  },
  {
      "child": [],
      "_id": "66dd5cdf3e6aca7243b79a53",
      "title": "Cereal",
      "slug": "cereal",
      "description": "The definition of a breakfast food is a food that is eaten primarily for the first meal of the day commonly including: cereal, toast, eggs, pancakes, waffles, pastries, sausage or bacon. An example of a breakfast food is oatmeal. An example of a breakfast food is french toast with scrambled eggs.",
      "status": "publish",
      "images": [
          "https://i.postimg.cc/yx57V7sW/quaker-oats-jar-500-gm.webp"
      ],
      "parent_category": "",
      "cat_id": "632aae624d87ff2494210951",
      "total": 0
  },
  {
      "child": [],
      "_id": "66dd5cdf3e6aca7243b79a54",
      "title": "Butter & Ghee",
      "slug": "butter-&-ghee",
      "description": "Butter, a yellow-to-white solid emulsion of fat globules, water, and inorganic salts produced by churning the cream from cows'milk. ... Butter is a high-energy food, containing approximately 715 calories per 100 grams. It has a high content of butterfat, or milk fat (at least 80 percent), but is low in protein.",
      "status": "publish",
      "images": [
          "https://i.postimg.cc/rwV1009C/Aseel-Vegetable-Ghee-500gm.jpg"
      ],
      "parent_category": "",
      "cat_id": "632ab16c4d87ff2494210a44",
      "total": 0
  },
  {
      "child": [],
      "_id": "66dd5cdf3e6aca7243b79a55",
      "title": "Dairy",
      "slug": "dairy",
      "description": "a room, building, or establishment where milk is kept and butter or cheese is made. 2a : the department of farming or of a farm that is concerned with the production of milk, butter, and cheese. b : a farm devoted to such production.",
      "status": "publish",
      "images": [
          "https://i.postimg.cc/0N9BNyzL/Shurfine-Whole-Milk-0-5-gal.jpg"
      ],
      "parent_category": "",
      "cat_id": "632ab1584d87ff2494210a31",
      "total": 0
  },
  {
      "child": [],
      "_id": "66dd5cdf3e6aca7243b79a56",
      "title": "Ice Cream",
      "slug": "ice-cream",
      "description": "Ice cream is a frozen dairy dessert obtained by freezing the ice cream mix with continuous agitation. It contains milk products, sweetening materials, stabilizers, colors, flavors, and egg products. Ice cream had its origins in Europe and was introduced later in the United States where it developed into an industry.",
      "status": "publish",
      "images": [
          "https://i.postimg.cc/Vv4jDzfb/Polar-1-Liter-Vanilla.jpg"
      ],
      "parent_category": "",
      "cat_id": "632ab1644d87ff2494210a3c",
      "total": 0
  },
  {
      "child": [],
      "_id": "66dd5cdf3e6aca7243b79a57",
      "title": "Air Freshener",
      "slug": "air-freshener",
      "description": "a device used to disperse chemicals intended to mask or eliminate unpleasant odors The bathrooms should also have matching towels, soap and tissue dispensers, and a candle or plug-in air freshener with a pleasant scent.",
      "status": "publish",
      "images": [
          "https://i.postimg.cc/7P0KvKrQ/Pure-Plant-Home-Lavender-Orange-Blossom-Candle-7oz.jpg"
      ],
      "parent_category": "",
      "cat_id": "632ac99d4d87ff2494210b64",
      "total": 0
  },
  {
      "child": [],
      "_id": "66dd5cdf3e6aca7243b79a58",
      "title": "Cleaner",
      "slug": "cleaner",
      "description": "A cleaner, or Custodian, is responsible for keeping offices, homes, hotels or other public areas neat and organized. Their main duties include sweeping, mopping and vacuuming floors, dusting countertops, ceilings and furniture and sanitizing bathrooms, kitchens or other public areas.",
      "status": "publish",
      "images": [
          "https://i.postimg.cc/kgjcJb0f/So-Phresh-Bio-enzymatic-Dog-Stain-Odor-Remover-2-23lb.jpg"
      ],
      "parent_category": "",
      "cat_id": "632ac9934d87ff2494210b54",
      "total": 0
  },
  {
      "child": [],
      "_id": "66dd5cdf3e6aca7243b79a59",
      "title": "Cleaning Tools",
      "slug": "cleaning-tools",
      "description": "A variety of accurate and specific tools and products created and designed in various colors, materials, mechanisms, shapes, sizes and styles to clean easily, effectively and efficiently. Cleaning tools are vital to clean especially when your form of employment involves cleaning.",
      "status": "publish",
      "images": [
          "https://i.postimg.cc/JnXrRfRF/Continental-Complete-Window-Squeegee-12-in.jpg"
      ],
      "parent_category": "",
      "cat_id": "632ac9ba4d87ff2494210b7c",
      "total": 0
  },
  {
      "child": [],
      "_id": "66dd5cdf3e6aca7243b79a5a",
      "title": "Women",
      "slug": "women",
      "description": "A laundry service is a service in a hotel that washes and irons clothes for guests. Almost all hotels have a laundry service. If you hand in clothes one day you should get them back a day or two later. The laundry service will wash, dry, and iron your clothes.",
      "status": "publish",
      "images": [
          "https://i.postimg.cc/LsHQ9L2F/Xtra-Spring-Sunshine-Scentsations-116-Loads-Liquid-laundry-Detergent-175fl-oz.jpg"
      ],
      "parent_category": "",
      "cat_id": "632ab2c34d87ff2494210ab2",
      "total": 0
  },
  {
      "child": [],
      "_id": "66dd5cdf3e6aca7243b79a5b",
      "title": "Pest Control",
      "slug": "pest-control",
      "description": "Pest control is the regulation or management of a species defined as a pest, a member of the animal kingdom that impacts adversely on human activities. ... This can be achieved by monitoring the crop, only applying insecticides when necessary, and by growing varieties and crops which are resistant to pests.",
      "status": "publish",
      "images": [
          "https://i.postimg.cc/sXFXGYD1/Orange-Guard-Insect-Spray-Gallon-128-fl-oz.jpg"
      ],
      "parent_category": "",
      "cat_id": "632ac9b24d87ff2494210b74",
      "total": 0
  },
  {
      "child": [],
      "_id": "66dd5cdf3e6aca7243b79a5c",
      "title": "Water Filter",
      "slug": "water-filter",
      "description": "water filtering is a method used to filter out undesired chemical compounds, organic and inorganic materials, and biological contaminants from water. The purpose of water filtration is to provide clean drinking water.",
      "status": "publish",
      "images": [
          "https://i.postimg.cc/jjksyzxy/BRITA-water-Filter-Pitcher-1each.jpg"
      ],
      "parent_category": "",
      "cat_id": "632ac9c24d87ff2494210b84",
      "total": 0
  },
  {
      "child": [],
      "_id": "66dd5cdf3e6aca7243b79a5d",
      "title": "Pet Care",
      "slug": "pet-care",
      "description": "Many species of birds make fun, engaging pets. If you're considering bird ownership, the care requirements include providing good housing, nutritious food, and keeping an eye on the bird's health. You'll also need to provide plenty of enrichment and interaction, to keep your pet bird happy and alert.",
      "status": "publish",
      "images": [],
      "parent_category": "",
      "cat_id": "632ab4434d87ff2494210b0e",
      "total": 0
  },
  {
      "child": [],
      "_id": "66dd5cdf3e6aca7243b79a5e",
      "title": "Cat Care",
      "slug": "cat-care",
      "description": "Many species of birds make fun, engaging pets. If you're considering bird ownership, the care requirements include providing good housing, nutritious food, and keeping an eye on the bird's health. You'll also need to provide plenty of enrichment and interaction, to keep your pet bird happy and alert.",
      "status": "publish",
      "images": [],
      "parent_category": "",
      "cat_id": "632ab4524d87ff2494210b19",
      "total": 0
  },
  {
      "child": [],
      "_id": "66dd5cdf3e6aca7243b79a5f",
      "title": "Dog Care",
      "slug": "dog-care",
      "description": "Dog Sitters supervise pets and take care of them in their owners'absence. Typical activities seen on a Dog Sitter example resume are grooming, providing food and water, taking dogs out for walk, taking dogs to vet appointments, administering medication, providing companionship, and following owner instructions.",
      "status": "publish",
      "images": [
          "https://i.postimg.cc/nzfr54mB/Wlgd-Small-water-Blue-Pin-Brush-0-21lb.jpg"
      ],
      "parent_category": "",
      "cat_id": "632ab45b4d87ff2494210b21",
      "total": 0
  },
  {
      "child": [],
      "_id": "66dd5cdf3e6aca7243b79a60",
      "title": "Canned Food",
      "slug": "canned-food",
      "description": "canned food - food preserved by canning. canned foods, canned goods, tinned goods. food product, foodstuff - a substance that can be used or prepared for use as food. canned meat, tinned meat - meat preserved in a can or tin.",
      "status": "publish",
      "images": [
          "https://i.postimg.cc/hPmDFzS0/Hibiscus-Premium-Whole-Baby-Corn-425g.jpg"
      ],
      "parent_category": "",
      "cat_id": "62cfab4b484d89068aa7a7ff",
      "total": 0
  },
  {
      "child": [],
      "_id": "66dd5cdf3e6aca7243b79a61",
      "title": "Chips & Nuts",
      "slug": "chips-&-nuts",
      "description": "a small usually thin and flat piece (as of wood or stone) cut, struck, or flaked off. b : a small piece of food: such as. (1) : a small, thin, crisp, usually salty piece of food typically prepared by frying, baking, or drying banana chips especially : potato chip — see also corn chip.",
      "status": "publish",
      "images": [
          "https://i.postimg.cc/SKg2X2YM/Lays-Classic-Salted-25g.jpg"
      ],
      "parent_category": "",
      "cat_id": "62cfab39484d89068aa7a7fb",
      "total": 0
  },
  {
      "child": [],
      "_id": "66dd5cdf3e6aca7243b79a62",
      "title": "Chocolate",
      "slug": "chocolate",
      "description": "a small usually thin and flat piece (as of wood or stone) cut, struck, or flaked off. b : a small piece of food: such as. (1) : a small, thin, crisp, usually salty piece of food typically prepared by frying, baking, or drying banana chips especially : potato chip — see also corn chip.",
      "status": "publish",
      "images": [
          "https://i.postimg.cc/cLg8bMC4/M-M-Choco-chocolate-45gm.jpg"
      ],
      "parent_category": "",
      "cat_id": "62cfab28484d89068aa7a7f5",
      "total": 0
  },
  {
      "child": [],
      "_id": "66dd5cdf3e6aca7243b79a63",
      "title": "Shaving Needs",
      "slug": "shaving-needs",
      "description": "Health products are defined as those substances which gives energy or makes the person healthy. Health products are vitamins, minerals, herbal medicines, homeopathic preparations, probiotics and even some traditional medicines are also prescribed by doctor or any equivalent physician.",
      "status": "publish",
      "images": [
          "https://i.ibb.co/gMLqP7Q/Gillette-Vector-2s-Cartridges.jpg"
      ],
      "parent_category": "",
      "cat_id": "632ab2d54d87ff2494210ac0",
      "total": 0
  },
  {
      "child": [],
      "_id": "66dd5cdf3e6aca7243b79a64",
      "title": "Oral Care",
      "slug": "oral-care",
      "description": "oral-care Products are intended to cleanse the oral cavity, freshen the breath, and maintain good oral hygiene. Some products also include ingredients to protect against the formation of cavities.",
      "status": "publish",
      "images": [
          "https://i.ibb.co/sFgkd5X/Pepsodent-Action-Toothbrush-Medium.jpg"
      ],
      "parent_category": "",
      "cat_id": "632ab2f84d87ff2494210ad8",
      "total": 0
  },
  {
      "child": [],
      "_id": "66dd5cdf3e6aca7243b79a65",
      "title": "Body Care",
      "slug": "body-care",
      "description": "hair-care products are those that help to control the properties and behavior of the hair so that it can be maintained in a controlled and desirable manner. This can include hair conditioners, hair sprays, hair straighteners and relaxers, permanent waves, shampoos, rinses, tonics and dressings.",
      "status": "publish",
      "images": [
          "https://i.ibb.co/X4pdPwn/Pantene-Expert-Pro-V-Intense-Hydration-Shampoo-3-9-fl-oz.jpg"
      ],
      "parent_category": "",
      "cat_id": "632ab2df4d87ff2494210ac8",
      "total": 0
  },
  {
      "child": [],
      "_id": "66dd5cdf3e6aca7243b79a66",
      "title": "Cosmetics",
      "slug": "cosmetics",
      "description": "A cosmetic product shall mean any substance or mixture intended to be placed in contact with the various external parts of the human body (epidermis, hair system, nails, lips and external genital organs) or with the teeth and the mucous membranes of the oral cavity with a view exclusively or mainly to cleaning them",
      "status": "publish",
      "images": [
          "https://i.ibb.co/K0SBD3v/Revlon-Lipstick-Creme-Temptress-680-0-15oz.jpg"
      ],
      "parent_category": "",
      "cat_id": "632ab2fd4d87ff2494210ae0",
      "total": 0
  },
  {
      "child": [],
      "_id": "66dd5cdf3e6aca7243b79a67",
      "title": "Bath",
      "slug": "bath",
      "description": "bathroom accessories are items specifically designed for use in a bathroom, such as soap dishes, towel racks, etc. bathroom accessories accessories typically have durable, decorative finishes.",
      "status": "publish",
      "images": [
          "https://i.ibb.co/XL8Dmw5/Savlon-Fresh-Antiseptic-Soap-100-Gm.jpg"
      ],
      "parent_category": "",
      "cat_id": "632ab3044d87ff2494210ae8",
      "total": 0
  },
  {
      "child": [],
      "_id": "66dd5cdf3e6aca7243b79a68",
      "title": "Beauty & Healths",
      "slug": "beauty-&-healths",
      "description": "bathroom accessories are items specifically designed for use in a bathroom, such as soap dishes, towel racks, etc. bathroom accessories accessories typically have durable, decorative finishes.",
      "status": "publish",
      "images": [
          "https://i.ibb.co/26DbDXx/Harmony-Orange-Satsuma-Soap-70g.jpg"
      ],
      "parent_category": "",
      "cat_id": "632ab2864d87ff2494210a8a",
      "total": 0
  },
  {
      "child": [],
      "_id": "66dd5cdf3e6aca7243b79a69",
      "title": "Baby Food",
      "slug": "baby-food",
      "description": "Baby Products are products intended to be used on infants and category under the age of three. Baby products are specially formulated to be mild and non-irritating and use ingredients that are selected for these properties. Baby products include baby shampoos and baby lotions, oils, powders and creams.",
      "status": "publish",
      "images": [
          "https://i.ibb.co/yYsskBN/Cerelac-Wheat-apple-Cornflakes-400-Gm-BIB.jpg"
      ],
      "parent_category": "",
      "cat_id": "63f12afdcc480f0454f475dd",
      "total": 0
  },
  {
      "child": [],
      "_id": "66dd5cdf3e6aca7243b79a6a",
      "title": "Milk & Dairy",
      "slug": "milk-&-dairy",
      "description": "Baby Products are products intended to be used on infants and category under the age of three. Baby products are specially formulated to be mild and non-irritating and use ingredients that are selected for these properties. Baby products include baby shampoos and baby lotions, oils, powders and creams.",
      "status": "publish",
      "images": [
          "https://i.ibb.co/YddcNxc/Biomil-1-MINI-Tin-200-Gm.jpg"
      ],
      "parent_category": "",
      "cat_id": "632ab14a4d87ff2494210a29",
      "total": 0
  }
]


export default function MultiSelect() {
  return (
    <Select
      label="Favorite Animal"
      placeholder="Select an animal"
      selectionMode="multiple"
      className="max-w-xs"
    >
      {category.map((animal) => (
        <SelectItem key={animal._id}>
          {animal.title}
        </SelectItem>
      ))}
    </Select>
  );
}
