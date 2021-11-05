import React, { useState } from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import FloatingRectangle from './components/floating-rectangle';

const App = () => {
  const [showFloatingRectangle, setShowFloatingRectangle] = useState(true)

  return (
    <SafeAreaView style={{backgroundColor: '#ffffff'}}>
      <StatusBar barStyle={'dark-content'} backgroundColor="#ffffff" />
      <View style={styles.container}>
        {showFloatingRectangle && <FloatingRectangle setShowFloatingRectangle={setShowFloatingRectangle} />}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    minHeight: '100%',
  },
});

export default App;
