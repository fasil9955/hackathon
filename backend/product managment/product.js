//imports and the db connection

//verification
const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) return res.status(403).send("Access denied. No token provided.");

  jwt.verify(token, "secretKey", (err, decoded) => {
    if (err) return res.status(401).send("Invalid token.");
    req.user = decoded;
    next();
  });
};

const isAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).send("Access denied. Admins only can access.");
  }
  next();
};

app.get("/products", (req, res) => {
  const query = "SELECT * FROM products";
  db.query(query, (err, results) => {
    if (err) {
      res.status(500).send("Error in retriving products.");
    } else {
      res.json(results);
    }
  });
});

app.post("/products", verifyToken, isAdmin, (req, res) => {
  const { name, description, price, stock_level, reorder_point, category_id } =
    req.body;
  const query = `INSERT INTO products (name, description, price, stock_level, reorder_point, category_id) 
                   VALUES (?, ?, ?, ?, ?, ?)`;
  db.query(
    query,
    [name, description, price, stock_level, reorder_point, category_id],
    (err) => {
      if (err) {
        res.status(500).send("Error in  adding product.");
      } else {
        res.send("Product added successfully.");
      }
    }
  );
});

app.put("/products/:id", verifyToken, isAdmin, (req, res) => {
  const { id } = req.params;
  const { name, description, price, stock_level, reorder_point, category_id } =
    req.body;
  const query = `UPDATE products 
                   SET name = ?, description = ?, price = ?, stock_level = ?, reorder_point = ?, category_id = ? 
                   WHERE product_id = ?`;
  db.query(
    query,
    [name, description, price, stock_level, reorder_point, category_id, id],
    (err) => {
      if (err) {
        res.status(500).send("Error updating product.");
      } else {
        res.send("Product updated successfully.");
      }
    }
  );
});

app.delete("/products/:id", verifyToken, isAdmin, (req, res) => {
  const { id } = req.params;
  const query = `DELETE FROM products WHERE product_id = ?`;
  db.query(query, [id], (err) => {
    if (err) {
      res.status(500).send("Error in deleting product.");
    } else {
      res.send("Product deleted successfully.");
    }
  });
});
