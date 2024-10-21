// Utility function to dynamically import product images
const importAll = (requireContext) => {
  let images = {};
  requireContext.keys().forEach((item) => {
      images[item.replace("./", "")] = requireContext(item);
  });
  return images;
};

// Import all images from the "images/products" directory
const images = importAll(require.context("./images/products", false, /\.(png|jpe?g|svg)$/));
export const PRODUCTS = [
  {
      id: 1,
      productName: "Fidget Spinner",
      price: 49.99,
      productImage: images["fidget_spinner.png"],
      description: "A stress-relieving toy that you can spin between your fingers. Perfect for fidgety hands and a popular trend among both kids and adults. Featured in various YouTube viral videos in 2017.",
      review_rating: 3.5,
      category: "Toys & Hobbies",
      featured_on: ["YouTube", "Reddit"]
  },
  {
      id: 2,
      productName: "Heelys",
      price: 129.99,
      productImage: images["heelys.png"],
      description: "Shoes with retractable wheels on the heel, allowing you to walk or glide effortlessly. A favorite among kids and teens who love active play. Endorsed by pro skater Tony Hawk and popular among 2000s kids.",
      review_rating: 4.5,
      category: "Apparel",
      featured_on: ["X Games", "Nickelodeon"]
  },
  {
      id: 3,
      productName: "Big Red Boots",
      price: 1656.99,
      productImage: images["big_red_boots.jpg"],
      description: "Oversized statement boots that have taken social media by storm. Ideal for fashion-forward individuals who love to make a bold impression. Worn by celebrities like Lil Nas X and featured on fashion blogs.",
      review_rating: 4.5,
      category: "Apparel",
      featured_on: ["Paris Fashion Week", "Instagram"]
  },
  {
      id: 4,
      productName: "Fanny Pack",
      price: 468.99,
      productImage: images["fanny_pack.jpg"],
      description: "A retro-style belt bag that has made a comeback as a trendy accessory for carrying essentials hands-free. Seen on fashion runways and endorsed by Kendall Jenner.",
      review_rating: 4.5,
      category: "Apparel",
      featured_on: ["Coachella", "Vogue"]
  },
  {
      id: 5,
      productName: "Pop It Toy",
      price: 19.99,
      productImage: images["pop_it_toy.jpg"],
      description: "Silicone fidget toy featuring bubbles that can be popped back and forth. Helps relieve stress and provides sensory fun. Popularized through TikTok videos as a stress-relieving toy.",
      review_rating: 4.7,
      category: "Toys & Hobbies",
      featured_on: ["TikTok", "YouTube"]
  },
  {
      id: 6,
      productName: "Hoverboard",
      price: 259.99,
      productImage: images["hoverboard.jpg"],
      description: "A self-balancing scooter that provides a smooth ride and a cool way to get around. Suitable for outdoor fun and casual commutes. Featured in celebrity Instagram posts, including Justin Bieber.",
      review_rating: 4.3,
      category: "Lifestyle",
      featured_on: ["Instagram", "YouTube"]
  },
  {
      id: 7,
      productName: "Instant Film Camera",
      price: 99.99,
      productImage: images["instant_film_camera.png"],
      description: "Retro-style camera that instantly prints photos. Perfect for capturing memories and adding a nostalgic touch to your photo collection. Used by influencers for vintage-style photos on social media.",
      review_rating: 4.6,
      category: "Electronics",
      featured_on: ["Coachella", "Instagram"]
  },
  {
      id: 8,
      productName: "LED Strip Lights",
      price: 39.99,
      productImage: images["led_strip_lights.png"],
      description: "Flexible, color-changing lights that can be used to decorate any space. Popular for gaming setups, bedrooms, and mood lighting. Popular with YouTubers and Twitch streamers for gaming rooms.",
      review_rating: 4.8,
      category: "Electronics",
      featured_on: ["Twitch", "YouTube"]
  },
  {
      id: 9,
      productName: "Squishmallow",
      price: 29.99,
      productImage: images["squishmallow.png"],
      description: "Soft, plush toys that come in various cute designs. Loved by kids and adults for their huggable comfort and collectibility. Featured in TikTok videos as a trending collectible item.",
      review_rating: 4.9,
      category: "Toys & Hobbies",
      featured_on: ["TikTok", "Instagram"]
  },
  {
      id: 10,
      productName: "Reusable Metal Straws",
      price: 15.99,
      productImage: images["reusable_metal_straws.png"],
      description: "Eco-friendly metal straws that come with a cleaning brush. Ideal for reducing plastic waste while sipping your favorite drinks. Endorsed by environmental activists and seen in eco-friendly campaigns.",
      review_rating: 4.4,
      category: "Lifestyle",
      featured_on: ["Earth Day Events", "Instagram"]
  },
  {
      id: 11,
      productName: "Ring Light",
      price: 79.99,
      productImage: images["ring_light.png"],
      description: "Perfect for photography, video calls, and content creation. Provides even lighting for professional-quality shots. Used by TikTok creators and YouTube vloggers for content creation.",
      review_rating: 4.7,
      category: "Electronics",
      featured_on: ["TikTok", "YouTube"]
  },
  {
      id: 12,
      productName: "Smart Water Bottle",
      price: 49.99,
      productImage: images["smart_water_bottle.png"],
      description: "A bottle that tracks your daily water intake and reminds you to stay hydrated. Syncs with your phone for personalized hydration goals. Promoted by fitness influencers on Instagram.",
      review_rating: 4.3,
      category: "Lifestyle",
      featured_on: ["Fitness Expos", "Instagram"]
  },
  {
      id: 13,
      productName: "Retro Flip Phone",
      price: 199.99,
      productImage: images["retro_flip_phone.png"],
      description: "A nostalgic take on classic flip phones, featuring limited smart features for those who want a break from full-screen devices. Spotted in music videos and retro-themed social media posts.",
      review_rating: 4.1,
      category: "Electronics",
      featured_on: ["Music Videos", "Instagram"]
  },
  {
      id: 14,
      productName: "Portable Neck Fan",
      price: 24.99,
      productImage: images["portable_neck_fan.png"],
      description: "A hands-free, wearable fan that keeps you cool during hot weather or workouts. Features multiple speed settings and rechargeable battery. Frequently used at summer music festivals.",
      review_rating: 4.2,
      category: "Lifestyle",
      featured_on: ["Coachella", "Outdoor Festivals"]
  },
  {
      id: 15,
      productName: "Virtual Reality Headset",
      price: 834.99,
      productImage: images["vr_headset.png"],
      description: "High-waisted, textured leggings popularized on social media for their flattering fit. Perfect for workouts or casual wear. Made famous by TikTok fitness influencers and viral challenges.",
      review_rating: 4.6,
      category: "Electronics",
      featured_on: ["TikTok", "Instagram"]
  }
]