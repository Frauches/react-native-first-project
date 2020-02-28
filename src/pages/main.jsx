import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import api from "../services/api";

const Main = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  const [productInfo, setProductInfo] = useState({});
  const [page, setPage] = useState(1);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async (page = 1) => {
    const response = await api.get(`/products?page=${page}`);

    const { docs, ...productInfo } = response.data;
    setProducts([...products, ...docs]);
    setProductInfo(productInfo);
    setPage(page);
  };

  const renderItem = ({ item }) => {
    return (
      <View style={styles.productContainer}>
        <Text style={styles.productTitle}>{item.title}</Text>
        <Text style={styles.productDescription}>{item.description}</Text>
        <TouchableOpacity
          style={styles.productButton}
          onPress={() => {
            navigation.navigate("Product", {product: item});
          }}
        >
          <Text style={styles.productButtonText}>Acessar</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const loadMore = () => {
    if (page === productInfo.pages) return;

    const pageNumber = page + 1;
    loadProducts(pageNumber);
  };

  return (
    <View style={styles.container}>
      <FlatList
        contentContainerStyle={styles.list}
        data={products}
        keyExtractor={item => item._id}
        renderItem={renderItem}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fafafa"
  },
  list: {
    padding: 20
  },
  productContainer: {
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    padding: 20,
    marginBottom: 20
  },
  productTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333"
  },
  productDescription: {
    fontSize: 16,
    color: "#999",
    lineHeight: 24
  },
  productButton: {
    height: 42,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: "#DA552F",
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10
  },
  productButtonText: {
    fontSize: 16,
    color: "#DA552F",
    fontWeight: "bold"
  }
});

export default Main;
