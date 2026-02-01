-- usuario id 1 es un usuario de prueba ya existente
INSERT INTO usuarios (nombre, apellido, telefono, correo, direccion, contrasena, foto_perfil)
VALUES (
    'Master',
    'Admin',
    '000000000',
    'master@outlook.com',
    'Sin dirección',
    '$2b$10$8pQx1nQ0qv8u8uQf8YtO8u7p8x6mCk8q3Qp8uQe8uQe8uQe8uQe8u', -- hashed password 'master1234'
    NULL
);

--Insertar datos (INSERT)
INSERT INTO productos (usuario_id, categoria, nombre, descripcion, precio, imagen)
VALUES
(1, 'Kitchen', 'Coconut Bowls Set', 'Handmade eco-friendly bowls made from real coconuts.', 22.99, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPaDLU8VCPfYCMFeCWCquASzTcfHqCiQnhLA&s'),
(1, 'Food - Sides', 'Mashed Sweet Potatoes', 'Creamy mashed sweet potatoes with a hint of cinnamon.', 3.99, 'https://www.seriouseats.com/thmb/gOurY7yg5LmwH4NhxqrhCW815aQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/__opt__aboutcom__coeus__resources__content_migration__serious_eats__seriouseats.com__recipes__images__2014__11__20141107-mashed-sweet-potatoes-food-lab-thanksgiving-08-f5a30257e95a480fad75061e13cab74d.jpg'),
(1, 'Food - Canned Goods', 'Tuscan Bean Soup', 'A hearty mix of beans in a flavorful tomato broth.', 2.49, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTairzbxGKZNv8vjemT4N0FF-peneR5iFHIRA&s'),
(1, 'Beauty', 'Adjustable Pedicure Footrest', 'Ergonomic footrest for easier pedicure treatment.', 39.99, 'https://m.media-amazon.com/images/I/51t1ejk-UKL._AC_SL1001_.jpg'),
(1, 'Food - Frozen', 'Vegan Mac & Cheese', 'Creamy vegan mac and cheese made with cashew cheese.', 8.99, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIs9O1NCt9CAXbebAUEz0gHd7eNCaUH1GOSQ&s'),
(1, 'Fitness', 'Fitness Jump Rope with LCD Counter', 'Weighted jump rope that counts jumps and calories burned.', 15.99, 'https://m.media-amazon.com/images/I/61yn2PBZ2+L._AC_UF1000,1000_QL80_.jpg'),
(1, 'Accessories', 'Sunglasses', 'Polarized sunglasses with UV protection.', 29.99, 'https://eyejack.in/cdn/shop/files/17001pcl746-1.jpg?v=1745665948'),
(1, 'Food - Sauces', 'Tomato Basil Pasta Sauce', 'Rich and flavorful pasta sauce made with ripe tomatoes and basil.', 3.99, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfYbY2-2nTDiSZDX_hsCfnnvEVYiRzP6vopg&s'),
(1, 'Garden', 'Garden Cutter', 'Excellent tool for trimming garden plants.', 19.99, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMlBFCoozE4je-D4v7CVJXV9u8gRqabPu5Dw&s'),
(1, 'Toys', 'Wooden Children''s Play Kitchen', 'Interactive kitchen set for imaginative play.', 129.99, 'https://m.media-amazon.com/images/I/710EjTISklL.jpg'),
(1, 'Health', 'Electric Toothbrush', 'Rechargeable electric toothbrush with smart timer.', 49.95, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1IX8kLwgn9r84JWHxNsSNcEF8pGE-8ouRKA&s'),
(1, 'Food - Baking', 'Baking Soda', 'Essential ingredient for baking and cooking.', 0.99, 'https://i5.walmartimages.com/seo/Arm-Hammer-Pure-Baking-Soda-12-lb-Reseable-Bag_106f29fb-b2d9-48ac-b4a2-71157d6a6f44.bc81f92e77b0f0a0c11475260962890a.jpeg'),
(1, 'Food - Condiments', 'Balsamic Fig Dressing', 'A sweet and tangy dressing made with figs and balsamic vinegar, great on salads.', 3.79, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSknJyMlc487JrutUdg8xVOPiajMInXOy9AsQ&s'),
(1, 'Art Supplies', 'Watercolor Set', 'Complete watercolor set with paints and brushes.', 19.99, 'https://shop.archsupplies.com/cdn/shop/products/FCwcseton12_1000x.jpg?v=1655486731'),
(1, 'Food - Condiments', 'Italian Herb Balsamic Marinade', 'A rich marinade perfect for meats and vegetables, infused with Italian herbs and balsamic vinegar.', 3.99, 'https://img.cdn4dd.com/cdn-cgi/image/fit=contain,width=1200,height=672,format=auto/https://doordash-static.s3.amazonaws.com/media/photosV2/e0b506b3-407f-40aa-93f0-35a0e7ab2660-retina-large.jpg'),
(1, 'Kitchen', 'Personal Blender with Travel Lid', 'Blender designed for smoothies and shakes on the go.', 34.99, 'https://hamiltonbeach.com/media/products/51101BV-VPA-01.jpg'),
(1, 'Food - Canned Goods', 'Chicken Broth', 'Rich and flavorful chicken broth, great for soups.', 2.49, 'https://nourishedkitchen.com/wp-content/uploads/2018/07/chicken-bone-broth-recipe.jpg'),
(1, 'Food - Spices', 'Cajun Seasoning', 'Spicy seasoning mix for all your favorite dishes.', 1.99, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSk_jj6paGV6Adp3YXbQYciSZPzeEX_wXkgNA&s'),
(1, 'Food - Frozen Foods', 'Buffalo Cauliflower Wings', 'Crispy cauliflower bites tossed in spicy buffalo sauce.', 6.99, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShA4iLZeU2ym8A6oTHx4o2dQm6flnYdg1iCw&s'),
(1, 'Art Supplies', 'Watercolor Brush Pens', 'Set of brush pens for colorful and creative painting.', 19.99, 'https://m.media-amazon.com/images/I/81uJYds+RsL.jpg'),
(1, 'Garden', 'Garden Kneeler and Seat', 'Convertible kneeler and seat for gardening comfort.', 39.99, 'https://images.thdstatic.com/productImages/abaccefc-4db2-47a7-ac5c-886be1ce3b43/svn/gardening-tool-accessories-b0bty9qqjn-64_1000.jpg?odnHeight=117&odnWidth=117&odnBg=FFFFFF'),
(1, 'Food - Condiments', 'Orange Ginger Vinaigrette', 'Tangy vinaigrette with orange and ginger flavors.', 3.99, 'https://skinnyms.com/wp-content/uploads/2019/05/Orange-Ginger-Sesame-Salad-Dressing-1.jpg'),
(1, 'Clothing - Tops', 'Relaxed Fit Henley Shirt', 'A comfortable henley shirt made of soft cotton, perfect for casual outings.', 29.99, 'https://americantall.com/cdn/shop/files/Longjohn-and-Sons-Men-Jersey-Henley-Tee-Vintage-Black-Front_f84e8ef8-3703-4cb9-9fe8-6643eecf7f9a.jpg?v=1759788638'),
(1, 'Toys', 'Mini Air Hockey Table', 'Fun tabletop air hockey for home or office.', 39.99, 'https://m.media-amazon.com/images/I/71QWpVDnzuL._AC_UF894,1000_QL80_.jpg'),
(1, 'Outdoor', 'Kettle BBQ Grill', 'Charcoal kettle grill perfect for backyard barbecues.', 99.99, 'https://r.bolder.run/1037/original/912344-ProQ_Rodeo_Studio_Image_WEB_(4).jpg'),
(1, 'Food - Bakery', 'Whole Wheat Bread', 'Freshly baked whole wheat bread, rich in fiber.', 2.49, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNUYo3zXhDPi-S1LNuiS52fvM6SCG1PJeMFQ&s'),
(1, 'Clothing - Bags', 'Leather Crossbody Bag', 'A chic leather crossbody bag for everyday use.', 89.99, 'https://ghurka.com/cdn/shop/files/gearpack-no-4-440547.jpg?v=1726928875'),
(1, 'Tools', 'Folding Pocket Knife', 'Compact knife with safety lock for everyday use.', 24.99, 'https://m.media-amazon.com/images/I/81DoC37QC-L.jpg'),
(1, 'Toys', 'Kids'' Gardening Kit', 'Complete set designed for children to learn gardening.', 24.99, 'https://littleonemag.com/wp-content/uploads/2019/07/71upZGaQN2L._SL1500_-min.jpg'),
(1, 'Food - Produce', 'Creamy Coleslaw Mix', 'Shredded cabbage and carrots for coleslaw.', 2.39, 'https://www.billyparisi.com/wp-content/uploads/2021/06/coleslaw-1.jpg');


