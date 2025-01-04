import { columns } from "./columns";
import { DataTable } from "./data-table";

export default function DemoPage() {
  const data = [
    {
      id: "1",
      quantity: 10,
      name: "Wireless Mouse",
      price: 15.99,
      description:
        "A compact and portable wireless mouse with ergonomic design.",
    },
    {
      id: "2",
      quantity: 20,
      name: "Keyboard",
      price: 25.99,
      description:
        "A full-size keyboard with responsive keys and a durable build.",
    },
    {
      id: "3",
      quantity: 5,
      name: "Laptop Stand",
      price: 45.49,
      description:
        "Adjustable aluminum laptop stand with ventilation and portability.",
    },
    {
      id: "4",
      quantity: 8,
      name: "External Hard Drive",
      price: 59.99,
      description:
        "1TB external hard drive with USB 3.0 for fast data transfer.",
    },
    {
      id: "5",
      quantity: 15,
      name: "Gaming Headset",
      price: 34.99,
      description:
        "Noise-cancelling gaming headset with a built-in microphone.",
    },
  ];

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
