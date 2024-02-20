import { MaterialIcons } from "@expo/vector-icons";
import { Text, View } from "react-native";
import AppStyles from "../../styles/AppStyles";
import { useContext } from "react";
import { LogContext } from "../../context";

export default function DailyLogsProgress() {
  const { logs } = useContext(LogContext);

  return (
    <View style={[AppStyles.logProgress, {marginBottom: 16}]}>
      <Text style={AppStyles.logProgressText}>🔥 3 day streak</Text>
      <View style={AppStyles.logProgressDots}>
        {
          logs.map((item, index) =>
            item.submitted 
            ? <View 
                style={[AppStyles.logProgressDot, AppStyles.logProgressCompleted]}
                key={index}
              >
                <MaterialIcons name="check" size={16} color="#ECECEC" />
              </View>
            : index !== 0 
              ? <View 
                  style={[AppStyles.logProgressDot, logs[index - 1].submitted ? AppStyles.logProgressActive : {}]}
                  key={index}
                >
                </View>
              : <View 
                  style={[AppStyles.logProgressDot, !item.submitted && (!!item.poopPic || !!item.dailyQRE.qa[0].answer || item.cryRecord.completed) ? AppStyles.logProgressActive : {}]}
                  key={index}
                >
                </View>
          )
        }
      </View>
    </View>
  )
}
