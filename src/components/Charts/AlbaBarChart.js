import { Dimensions, StyleSheet, Text, View } from "react-native";
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from "react-native-chart-kit";

export const windowWidth = Dimensions.get('window').width;

export default function AlbaBarChart() {
  return (
    <View style={styles.chartWrapperView}>
      <BarChart
        data={{
          labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          datasets: [
            {
              data: [50, 65, 78, 80, 99, 73, 50],
            },
          ],
        }}
        width={Dimensions.get('window').width - 50}
        height={220}
        yAxisLabel={'Rs'}
        chartConfig={{
          backgroundColor: '#1cc910',
          backgroundGradientFrom: '#eff3ff',
          backgroundGradientTo: '#efefef',
          decimalPlaces: 2,
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          style: {
            borderRadius: 16,
            borderColor: '#ECECEC',
            borderWidth: 1.5,
            backgroundColor: '#FEFEFC'
          },
        }}
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      />
    </View>
  )
}

const styles=StyleSheet.create({
  chartWrapperView: {
  }
});
