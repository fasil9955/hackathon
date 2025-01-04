import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Plus, Pencil, Trash2 } from "lucide-react";

const SupplierManagement = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const [formData, setFormData] = useState({
    supplier_id: "",
    name: "",
    contact: "",
    address: "",
    email: "",
  });
  const [error, setError] = useState("");

  // In a real app, this would come from auth context
  const isAdmin = true;

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const resetForm = () => {
    setFormData({
      supplier_id: "",
      name: "",
      contact: "",
      address: "",
      email: "",
    });
    setSelectedSupplier(null);
    setError("");
  };

  const handleSubmit = async () => {
    try {
      // Validation
      if (!formData.supplier_id || !formData.name || !formData.email) {
        setError("Please fill in all required fields");
        return;
      }

      if (selectedSupplier) {
        // Update existing supplier
        setSuppliers(
          suppliers.map((supplier) =>
            supplier.supplier_id === selectedSupplier.supplier_id
              ? formData
              : supplier
          )
        );
      } else {
        // Check if supplier_id already exists
        if (
          suppliers.some(
            (supplier) => supplier.supplier_id === formData.supplier_id
          )
        ) {
          setError("Supplier ID already exists");
          return;
        }
        // Add new supplier
        setSuppliers([...suppliers, formData]);
      }

      setIsAddModalOpen(false);
      resetForm();
    } catch (error) {
      setError("Error processing supplier");
    }
  };

  const handleEditSupplier = (supplier) => {
    setSelectedSupplier(supplier);
    setFormData(supplier);
    setIsAddModalOpen(true);
  };

  const handleDeleteSupplier = async (supplierToDelete) => {
    try {
      // Filter out only the specific supplier
      setSuppliers(
        suppliers.filter(
          (supplier) => supplier.supplier_id !== supplierToDelete.supplier_id
        )
      );
    } catch (error) {
      setError("Error deleting supplier");
    }
  };

  return (
    <div className="p-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Supplier Management</CardTitle>
          {isAdmin && (
            <Dialog
              open={isAddModalOpen}
              onOpenChange={(open) => {
                setIsAddModalOpen(open);
                if (!open) resetForm();
              }}
            >
              <DialogTrigger asChild>
                <Button onClick={resetForm} className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  Add Supplier
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>
                    {selectedSupplier ? "Edit Supplier" : "Add New Supplier"}
                  </DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  {error && (
                    <Alert variant="destructive">
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}
                  <div className="space-y-2">
                    <Input
                      name="supplier_id"
                      placeholder="Supplier ID"
                      value={formData.supplier_id}
                      onChange={handleInputChange}
                      disabled={selectedSupplier !== null}
                    />
                    <Input
                      name="name"
                      placeholder="Name"
                      value={formData.name}
                      onChange={handleInputChange}
                    />
                    <Input
                      name="contact"
                      placeholder="Contact"
                      value={formData.contact}
                      onChange={handleInputChange}
                    />
                    <Input
                      name="address"
                      placeholder="Address"
                      value={formData.address}
                      onChange={handleInputChange}
                    />
                    <Input
                      name="email"
                      placeholder="Email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                  </div>
                  <Button onClick={handleSubmit} className="w-full">
                    {selectedSupplier ? "Update Supplier" : "Add Supplier"}
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          )}
        </CardHeader>
        <CardContent>
          <div className="relative overflow-x-auto">
            <div className="w-full border rounded-lg">
              <div className="grid grid-cols-6 bg-gray-100 p-4 border-b">
                <div className="font-semibold">Supplier ID</div>
                <div className="font-semibold">Name</div>
                <div className="font-semibold">Contact</div>
                <div className="font-semibold">Address</div>
                <div className="font-semibold">Email</div>
                {isAdmin && <div className="font-semibold">Actions</div>}
              </div>
              <div className="divide-y">
                {suppliers.map((supplier) => (
                  <div
                    key={supplier.supplier_id}
                    className="grid grid-cols-6 p-4"
                  >
                    <div>{supplier.supplier_id}</div>
                    <div>{supplier.name}</div>
                    <div>{supplier.contact}</div>
                    <div>{supplier.address}</div>
                    <div>{supplier.email}</div>
                    {isAdmin && (
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEditSupplier(supplier)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDeleteSupplier(supplier)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SupplierManagement;
