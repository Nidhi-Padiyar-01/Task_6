import java.io.FileWriter;
import java.io.IOException;
import java.util.Scanner;

public class BillGenerator {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        StringBuilder bill = new StringBuilder();

        System.out.println("Enter Customer Name:");
        String customerName = scanner.nextLine();
        bill.append("Customer: ").append(customerName).append("\n");
        bill.append("----------------------------\n");

        int totalAmount = 0;
        
        while (true) {
            System.out.println("Enter Item Name (or 'done' to finish):");
            String item = scanner.nextLine();
            if (item.equalsIgnoreCase("done")) break;

            System.out.println("Enter Quantity:");
            int quantity = Integer.parseInt(scanner.nextLine());  // FIX: Read as String & Convert to Integer

            System.out.println("Enter Price per Item:");
            int price = Integer.parseInt(scanner.nextLine());  // FIX: Read as String & Convert to Integer

            int total = quantity * price;
            totalAmount += total;

            bill.append(String.format("%-10s x %d @ %d = %d\n", item, quantity, price, total));
        }

        bill.append("----------------------------\n");
        bill.append("Total Amount: ₹").append(totalAmount).append("\n");

        // Save to a text file
        try {
            FileWriter writer = new FileWriter("bill.txt");
            writer.write(bill.toString());
            writer.close();
            System.out.println("Bill saved as bill.txt");
        } catch (IOException e) {
            System.out.println("Error writing bill to file.");
            e.printStackTrace();
        }

        scanner.close();
    }
} 
