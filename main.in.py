"""
Mini Project: Contact Directory and Stock Tracker
Language: Python
Concepts: Dictionaries, safe retrieval, iteration, dictionary methods
"""

contacts = {}
products = {}


def add_contact():
    name = input("Enter contact name: ").strip()
    if not name:
        print("Name cannot be empty.")
        return

    phone = input("Enter phone number: ").strip()
    email = input("Enter email: ").strip()

    # setdefault() creates a record only if the name is not already present.
    contact = contacts.setdefault(name, {})
    if contact:
        print("Contact already exists. Updating its details.")
    contact.update({"phone": phone, "email": email})
    print("Contact saved successfully.")


def search_contact():
    name = input("Enter contact name to search: ").strip()
    # get() safely retrieves a value; it returns None if the key is absent.
    contact = contacts.get(name)
    if contact is None:
        print("Contact not found.")
    else:
        print(f"Name: {name}")
        print(f"Phone: {contact.get('phone', 'Not provided')}")
        print(f"Email: {contact.get('email', 'Not provided')}")


def update_contact():
    name = input("Enter contact name to update: ").strip()
    contact = contacts.get(name)
    if contact is None:
        print("Contact not found.")
        return

    phone = input(f"New phone [{contact.get('phone', '')}]: ").strip()
    email = input(f"New email [{contact.get('email', '')}]: ").strip()

    changes = {}
    if phone:
        changes["phone"] = phone
    if email:
        changes["email"] = email

    contact.update(changes)
    print("Contact updated successfully.")


def delete_contact():
    name = input("Enter contact name to delete: ").strip()
    # pop() removes and returns the value; the default avoids a KeyError.
    removed = contacts.pop(name, None)
    if removed is None:
        print("Contact not found.")
    else:
        print("Contact deleted successfully.")


def display_contacts():
    if not contacts:
        print("Contact directory is empty.")
        return

    print("\n--- CONTACT DIRECTORY ---")
    # items() gives each key and its corresponding value.
    for name, details in contacts.items():
        print(
            f"Name: {name} | "
            f"Phone: {details.get('phone', 'Not provided')} | "
            f"Email: {details.get('email', 'Not provided')}"
        )


def add_product():
    name = input("Enter product name: ").strip()
    if not name:
        print("Product name cannot be empty.")
        return

    try:
        quantity = int(input("Enter quantity: "))
        price = float(input("Enter unit price: "))
        if quantity < 0 or price < 0:
            print("Quantity and price cannot be negative.")
            return
    except ValueError:
        print("Please enter a valid whole-number quantity and numeric price.")
        return

    # setdefault() keeps an existing record instead of replacing it.
    product = products.setdefault(name, {"quantity": 0, "price": 0.0})
    product.update({"quantity": quantity, "price": price})
    print("Product saved successfully.")


def search_product():
    name = input("Enter product name to search: ").strip()
    product = products.get(name)
    if product is None:
        print("Product not found.")
    else:
        print(f"Product: {name}")
        print(f"Quantity: {product.get('quantity', 0)}")
        print(f"Unit price: Rs. {product.get('price', 0.0):.2f}")


def update_stock():
    name = input("Enter product name to update: ").strip()
    product = products.get(name)
    if product is None:
        print("Product not found. Add the product first.")
        return

    try:
        quantity_text = input(
            f"New quantity [{product.get('quantity', 0)}] (leave blank to keep): "
        ).strip()
        price_text = input(
            f"New unit price [{product.get('price', 0.0)}] (leave blank to keep): "
        ).strip()

        changes = {}
        if quantity_text:
            quantity = int(quantity_text)
            if quantity < 0:
                print("Quantity cannot be negative.")
                return
            changes["quantity"] = quantity
        if price_text:
            price = float(price_text)
            if price < 0:
                print("Price cannot be negative.")
                return
            changes["price"] = price

        product.update(changes)
        print("Stock record updated successfully.")
    except ValueError:
        print("Invalid input. Please enter a valid quantity and price.")


def delete_product():
    name = input("Enter product name to delete: ").strip()
    removed = products.pop(name, None)
    if removed is None:
        print("Product not found.")
    else:
        print("Product deleted successfully.")


def display_products():
    if not products:
        print("Stock list is empty.")
        return

    print("\n--- STOCK TRACKER ---")
    total_value = 0.0
    # items() iterates over product names and their record dictionaries.
    for name, details in products.items():
        quantity = details.get("quantity", 0)
        price = details.get("price", 0.0)
        value = quantity * price
        total_value += value
        status = "LOW STOCK" if quantity <= 5 else "In stock"
        print(
            f"Product: {name} | Quantity: {quantity} | "
            f"Unit price: Rs. {price:.2f} | "
            f"Value: Rs. {value:.2f} | Status: {status}"
        )
    print(f"Total inventory value: Rs. {total_value:.2f}")


def dictionary_demo():
    print("\n--- DICTIONARY METHODS DEMO ---")

    print("Contact names (keys):", list(contacts.keys()))
    print("Contact records (values):", list(contacts.values()))
    print("Contact entries (items):")
    for name, details in contacts.items():
        print(name, "->", details)

    print("Product names (keys):", list(products.keys()))
    print("Product records (values):", list(products.values()))
    print("Product entries (items):")
    for name, details in products.items():
        print(name, "->", details)

    # get() safely retrieves without raising KeyError.
    print("Safe lookup for a sample contact:",
          contacts.get("Unknown", "No such contact"))


def contact_menu():
    while True:
        print("\n=== CONTACT DIRECTORY ===")
        print("1. Add contact")
        print("2. Search contact")
        print("3. Update contact")
        print("4. Delete contact")
        print("5. Display all contacts")
        print("0. Back to main menu")
        choice = input("Choose an option: ").strip()

        if choice == "1":
            add_contact()
        elif choice == "2":
            search_contact()
        elif choice == "3":
            update_contact()
        elif choice == "4":
            delete_contact()
        elif choice == "5":
            display_contacts()
        elif choice == "0":
            break
        else:
            print("Invalid choice. Try again.")


def stock_menu():
    while True:
        print("\n=== STOCK TRACKER ===")
        print("1. Add product")
        print("2. Search product")
        print("3. Update stock")
        print("4. Delete product")
        print("5. Display all products")
        print("0. Back to main menu")
        choice = input("Choose an option: ").strip()

        if choice == "1":
            add_product()
        elif choice == "2":
            search_product()
        elif choice == "3":
            update_stock()
        elif choice == "4":
            delete_product()
        elif choice == "5":
            display_products()
        elif choice == "0":
            break
        else:
            print("Invalid choice. Try again.")


def main():
    while True:
        print("\n====================================")
        print(" CONTACT DIRECTORY & STOCK TRACKER")
        print("====================================")
        print("1. Contact Directory")
        print("2. Stock Tracker")
        print("3. Demonstrate dictionary methods")
        print("0. Exit")
        choice = input("Choose an option: ").strip()

        if choice == "1":
            contact_menu()
        elif choice == "2":
            stock_menu()
        elif choice == "3":
            dictionary_demo()
        elif choice == "0":
            print("Thank you for using the project!")
            break
        else:
            print("Invalid choice. Please select 0, 1, 2, or 3.")


if __name__ == "__main__":
    main()
