import { StyleSheet, Text, View } from "react-native";

export default function AlbaCustomBarChart() {
  const data = [
    {label: 'Mon', value: Math.round(Math.random() * 100)},
    {label: 'Tue', value: Math.round(Math.random() * 100)},
    {label: 'Wed', value: Math.round(Math.random() * 100)},
    {label: 'Thu', value: Math.round(Math.random() * 100)},
    {label: 'Fri', value: Math.round(Math.random() * 100)},
    {label: 'Sat', value: Math.round(Math.random() * 100)},
    {label: 'Sun', value: Math.round(Math.random() * 100)},
  ];

  return (
    <View style={styles.chartContainer}>
      <Text style={styles.chartTitle}>This week</Text>
      <View style={styles.chartView}>
        {
          !!data && data.map((item, index) =>
            <View style={styles.chartElement} key={index}>
              <View style={styles.chartBar}>
                <View style={[
                    styles.chartBarActive, 
                    {
                      height: `${item.value}%`,
                      backgroundColor: item.value < 20 ? '#FA9485' : item.value < 50 ? '#FEE193' : '#65D6A3'
                    }
                  ]}
                ></View>
              </View>
              <Text style={styles.chartLabel}>{item.label}</Text>
            </View>
          )
        }
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
    borderRadius: 16,
  },
  chartTitle: {
    color: '#24231F',
    fontSize: 16,
    fontWeight: '600',
  },
  chartView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  chartElement: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  chartBar: {
    width: 16,
    height: 140,
    borderRadius: 4,
    backgroundColor: '#ECECEC',
  },
  chartBarActive: {
    width: 16,
    height: 80,
    borderRadius: 4,
    backgroundColor: '#65D6A3',
    marginTop: 'auto',
  },
  chartLabel: {
    color: '#BCBCBC',
    fontSize: 12,
    fontWeight: '500',
    marginTop: 8,
  }
});