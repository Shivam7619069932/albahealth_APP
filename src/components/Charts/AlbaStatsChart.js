import { MaterialIcons } from "@expo/vector-icons";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { LineChart } from "react-native-chart-kit";

export default function AlbaStatsChart() {

  return (
    <View style={styles.chartContainer}>
      <Text style={styles.chartTitle}>This month</Text>
      <View style={styles.statsContainer}>
        <View style={styles.statsView}>
          <Text style={styles.statsValue}>24</Text>
          <View style={styles.statsBottom}>
            <MaterialIcons name="arrow-upward" size={16} color="#65D6A3" />
            <Text style={styles.statsPercentValue}>40%</Text>
            <Text style={styles.statsPercentText}> vs last month</Text>
          </View>
        </View>
        <View style={styles.chartView}>
          <LineChart
            data={{
              labels: ['1w', '2w', '3w', '4w'],
              datasets: [
                {
                  data: [
                    Math.round(Math.random() * 10),
                    Math.round(Math.random() * 10),
                    Math.round(Math.random() * 10),
                    Math.round(Math.random() * 10),
                    Math.round(Math.random() * 10),
                  ],
                },
              ],
            }}
            width={Dimensions.get('window').width / 2 - 50} // from react-native
            height={60}
            yAxisLabel={''}
            chartConfig={{
              backgroundColor: '#FEFEFC',
              backgroundGradientFrom: '#FEFEFC',
              backgroundGradientTo: '#FEFEFC',
              decimalPlaces: 2, // optional, defaults to 2dp
              color: (opacity = 255) => `#12B76A`,
              style: {
                borderRadius: 0,
              },
            }}
            withHorizontalLines={false}
            withVerticalLines={false}
            bezier
            style={{
              borderRadius: 0,
              paddingRight: 0,
            }}
            hideLegend={ true }
          />
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  chartContainer: {
    width: '100%',
    borderWidth: 1.5,
    borderColor: '#ECECEC',
    backgroundColor: '#FEFEFC',
    padding: 25,
    paddingRight: 0,
    borderRadius: 16,
  },
  chartTitle: {
    color: '#24231F',
    fontSize: 16,
    fontWeight: '600',
  },
  statsContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  statsView: {
    flexDirection: 'column',
  },
  statsValue: {
    color: '#24231F',
    fontSize: 32,
    fontWeight: 'bold',
  },
  statsBottom: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: 16,
  },
  statsPercentValue: {
    color: '#3CAE7B',
    fontSize: 14,
    fontWeight: '500',
  },
  statsPercentText: {
    color: '#484848',
    fontSize: 14,
    fontWeight: '500',
  },
  chartView: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    // borderWidth: 1,
    // borderColor: 'red',
  },
});