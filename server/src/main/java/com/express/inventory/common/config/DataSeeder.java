package com.express.inventory.common.config;

import java.math.BigDecimal;
import java.util.List;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.express.inventory.api.products.Product;
import com.express.inventory.api.products.ProductRepository;

@Configuration
public class DataSeeder {

    @Bean
    CommandLineRunner seedProducts(ProductRepository productRepository) {
        return args -> {
            if (productRepository.count() > 0) {
                System.out.println("Products already exist. Skipping seed.");
                return;
            }

            List<Product> products = List.of(
                product("Organic Bananas", "Produce", 5, "0.79", "42"),
                product("Honeycrisp Apples", "Produce", 8, "1.29", "55"),
                product("Avocados", "Produce", 6, "1.49", "30"),
                product("Baby Spinach", "Produce", 4, "3.99", "18"),
                product("Romaine Lettuce", "Produce", 5, "2.49", "16"),
                product("Cherry Tomatoes", "Produce", 6, "2.99", "28"),
                product("Cucumbers", "Produce", 7, "0.99", "40"),
                product("Carrots", "Produce", 6, "1.89", "35"),
                product("Broccoli Crowns", "Produce", 5, "2.19", "20"),
                product("Russet Potatoes", "Produce", 10, "4.99", "24"),

                product("Whole Milk", "Dairy", 6, "3.69", "22"),
                product("2% Milk", "Dairy", 6, "3.49", "26"),
                product("Greek Yogurt Vanilla", "Dairy", 8, "5.99", "14"),
                product("Cheddar Cheese Block", "Dairy", 5, "4.79", "17"),
                product("Mozzarella Cheese", "Dairy", 5, "4.29", "19"),
                product("Salted Butter", "Dairy", 4, "4.99", "12"),
                product("Large Eggs 12ct", "Dairy", 6, "3.59", "25"),
                product("Heavy Cream", "Dairy", 4, "2.99", "11"),
                product("Cottage Cheese", "Dairy", 4, "3.49", "10"),
                product("Sour Cream", "Dairy", 4, "2.39", "13"),

                product("Sourdough Bread", "Bakery", 5, "4.49", "15"),
                product("Whole Wheat Bread", "Bakery", 5, "3.29", "20"),
                product("Plain Bagels", "Bakery", 5, "3.99", "18"),
                product("Blueberry Muffins", "Bakery", 4, "5.49", "9"),
                product("Croissants 4ct", "Bakery", 4, "4.99", "8"),
                product("Hamburger Buns", "Bakery", 5, "2.99", "14"),
                product("Hot Dog Buns", "Bakery", 5, "2.99", "12"),
                product("Cinnamon Rolls", "Bakery", 4, "4.79", "7"),

                product("Chicken Breast", "Meat", 6, "8.99", "21"),
                product("Ground Beef", "Meat", 6, "6.49", "19"),
                product("Pork Chops", "Meat", 5, "7.29", "13"),
                product("Bacon", "Meat", 5, "5.99", "16"),
                product("Breakfast Sausage", "Meat", 5, "4.99", "14"),
                product("Turkey Slices", "Meat", 4, "4.49", "11"),
                product("Salmon Fillets", "Seafood", 4, "10.99", "9"),
                product("Shrimp Raw", "Seafood", 4, "12.99", "8"),

                product("Frozen Pizza", "Frozen", 6, "6.99", "20"),
                product("Vanilla Ice Cream", "Frozen", 5, "5.49", "12"),
                product("Frozen Mixed Vegetables", "Frozen", 7, "2.49", "18"),
                product("Chicken Nuggets", "Frozen", 6, "7.99", "16"),
                product("French Fries", "Frozen", 6, "4.99", "17"),
                product("Frozen Waffles", "Frozen", 5, "3.99", "13"),

                product("Spaghetti", "Pantry", 10, "1.79", "40"),
                product("Penne Pasta", "Pantry", 10, "1.79", "35"),
                product("Jasmine Rice", "Pantry", 8, "6.99", "22"),
                product("Black Beans", "Pantry", 8, "1.29", "30"),
                product("Kidney Beans", "Pantry", 8, "1.29", "27"),
                product("Diced Tomatoes", "Pantry", 8, "1.59", "29"),
                product("Tomato Sauce", "Pantry", 8, "1.49", "26"),
                product("Chicken Broth", "Pantry", 6, "2.19", "24"),
                product("Olive Oil", "Pantry", 4, "8.99", "10"),
                product("Canola Oil", "Pantry", 4, "5.99", "12"),
                product("Peanut Butter", "Pantry", 6, "3.99", "18"),
                product("Strawberry Jam", "Pantry", 5, "3.49", "14"),
                product("Corn Flakes", "Pantry", 5, "4.29", "17"),
                product("Oatmeal", "Pantry", 6, "3.99", "19"),
                product("All-Purpose Flour", "Pantry", 6, "2.99", "15"),
                product("Granulated Sugar", "Pantry", 6, "3.29", "16"),
                product("Sea Salt", "Pantry", 5, "1.99", "11"),
                product("Black Pepper", "Pantry", 5, "2.49", "10"),

                product("Orange Juice", "Beverages", 5, "4.49", "13"),
                product("Apple Juice", "Beverages", 5, "3.99", "12"),
                product("Sparkling Water Lime", "Beverages", 8, "4.99", "21"),
                product("Cola 12pk", "Beverages", 6, "7.49", "18"),
                product("Lemonade", "Beverages", 5, "3.49", "14"),
                product("Bottled Water 24pk", "Beverages", 6, "5.99", "25"),
                product("Cold Brew Coffee", "Beverages", 4, "6.49", "9"),
                product("Green Tea Bags", "Beverages", 5, "3.99", "11"),

                product("Potato Chips", "Snacks", 7, "4.29", "20"),
                product("Tortilla Chips", "Snacks", 7, "3.99", "18"),
                product("Salsa Medium", "Snacks", 5, "3.49", "12"),
                product("Trail Mix", "Snacks", 5, "6.99", "10"),
                product("Granola Bars", "Snacks", 6, "4.49", "16"),
                product("Chocolate Cookies", "Snacks", 5, "3.79", "13"),
                product("Pretzels", "Snacks", 6, "2.99", "15"),
                product("Popcorn Butter", "Snacks", 5, "2.49", "14"),

                product("Dish Soap", "Household", 4, "3.99", "11"),
                product("Paper Towels 6ct", "Household", 4, "8.99", "9"),
                product("Toilet Paper 12ct", "Household", 4, "11.99", "8"),
                product("Laundry Detergent", "Household", 3, "12.49", "7"),
                product("All-Purpose Cleaner", "Household", 4, "4.99", "10"),
                product("Trash Bags", "Household", 4, "6.99", "9"),
                product("Aluminum Foil", "Household", 4, "4.29", "8"),
                product("Plastic Wrap", "Household", 4, "3.79", "8"),

                product("Shampoo", "Personal Care", 4, "6.99", "10"),
                product("Conditioner", "Personal Care", 4, "6.99", "9"),
                product("Body Wash", "Personal Care", 4, "5.99", "11"),
                product("Toothpaste", "Personal Care", 5, "3.49", "15"),
                product("Toothbrush 2pk", "Personal Care", 4, "4.99", "12"),
                product("Deodorant", "Personal Care", 4, "5.49", "10"),
                product("Hand Soap", "Personal Care", 5, "2.99", "16"),

                product("Dog Food Chicken Recipe", "Pet", 4, "18.99", "7"),
                product("Cat Food Salmon Recipe", "Pet", 4, "16.99", "6"),
                product("Dog Treats", "Pet", 5, "5.99", "12"),
                product("Cat Litter", "Pet", 3, "14.99", "5"),

                product("AA Batteries 8pk", "Electronics", 4, "7.99", "9"),
                product("LED Light Bulbs 4pk", "Electronics", 4, "9.99", "8"),
                product("Phone Charger USB-C", "Electronics", 3, "12.99", "6"),
                product("Extension Cord", "Electronics", 3, "14.99", "5"),

                product("Notebook College Ruled", "Office", 6, "2.49", "20"),
                product("Ballpoint Pens 10pk", "Office", 6, "3.99", "18"),
                product("Printer Paper 500ct", "Office", 4, "6.99", "9"),
                product("Sticky Notes", "Office", 5, "2.99", "14"),

                product("Vitamin C", "Health", 4, "8.99", "8"),
                product("Pain Relief Tablets", "Health", 4, "6.49", "10"),
                product("Bandages Variety Pack", "Health", 5, "4.99", "12"),
                product("Hand Sanitizer", "Health", 5, "3.49", "13"),

                product("Ground Coffee", "Pantry", 5, "9.49", "11"),
                product("Brown Rice", "Pantry", 7, "4.99", "14"),
                product("Maple Syrup", "Pantry", 4, "7.99", "8"),
                product("Pancake Mix", "Pantry", 5, "3.99", "12"),
                product("Mac and Cheese", "Pantry", 8, "1.49", "24"),
                product("Canned Tuna", "Pantry", 6, "1.99", "18"),
                product("Mayonnaise", "Pantry", 5, "4.49", "10"),
                product("Mustard", "Pantry", 5, "2.49", "11"),
                product("Ketchup", "Pantry", 5, "3.29", "13"),
                product("Pickles", "Pantry", 4, "3.99", "9")
            );

            productRepository.saveAll(products);
            System.out.println("Seeded " + products.size() + " products.");
        };
    }

    private Product product(String name, String category, int threshold, double price, int stock) {
    Product p = new Product();
    p.setName(name);
    p.setCategory(category);
    p.setLowStockThreshold(BigDecimal.valueOf(threshold));
    p.setPrice(BigDecimal.valueOf(price));
    p.setStock(BigDecimal.valueOf(stock));
    return p;
    }

    private Product product(
            String name,
            String category,
            int lowStockThreshold,
            String price,
            String stock
    ) {
        return Product.builder()
                .name(name)
                .category(category)
                .lowStockThreshold(BigDecimal.valueOf(lowStockThreshold))
                .price(new BigDecimal(price))
                .stock(new BigDecimal(stock))
                .build();
    }
}