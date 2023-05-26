import React, { useState } from 'react';
import { View, Text } from 'react-native';
import SearchBar from './SearchBar';
import { Product } from '../Products/Products';

const ProductList: React.FC = () => {
  const [searchResults, setSearchResults] = useState<Product[]>(products);

  const handleSearch = (results: Product[]) => {
    setSearchResults(results);
  };

  return (
    <View>
      <SearchBar products={products} onSearch={handleSearch} />
      {searchResults.map(product => (
        <Text key={product.id}>{product.title}</Text>
      ))}
    </View>
  );
};

export default ProductList;