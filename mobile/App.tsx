import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View } from 'react-native'
import {
  TransactionCard,
  TransactionCardProps,
} from './src/components/TransactionCard'

export const data: TransactionCardProps = {
  type: 'positive',
  title: 'Salary',
  amount: 'R$ 5.000,00',
  category: {
    name: 'Income',
    icon: 'dollar-sign',
  },
  date: '2024-06-10',
}

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <TransactionCard data={data} />
      <StatusBar style='auto' />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
