import { router } from "expo-router";
import { useState } from "react";
import { View, Button, StyleSheet, useColorScheme, Platform, Switch, TouchableOpacity } from "react-native";
import { Text, TextInput } from "@/components/Themed";
import { useStorageState } from "@/context/useStorageState";
import { addList } from "@/api/requests/addList";
import DateTimePicker, { DateTimePickerAndroid, DateTimePickerEvent } from "@react-native-community/datetimepicker";

export default function AddListScreen() {
  const colorScheme = useColorScheme();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(new Date());
  const [error, setError] = useState("");
  const [[isLoading, session]] = useStorageState("session");
  const [showDatePicker, setShowDatePicker] = useState(false);

  const onDateChange = (selectedDate: Date | undefined) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
  };

  const handleSubmit = async () => {
    try {
      const request: {
        title: string;
        description: string;
        eventDate?: string;
      } = {
        title: name,
        description: description,
      };

      if (showDatePicker) {
        const dateFormatted = date.toISOString().split("T")[0];
        request.eventDate = dateFormatted;
      }

      console.log(request);

      await addList(request, session as string);
      router.navigate("(tabs)");
    } catch (error) {
      console.error(error);
      setError("Wystąpił błąd");
    }
  };

  const inputStyle = {
    ...styles.input,
    backgroundColor: colorScheme == "dark" ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)",
  };

  const calendarComponent =
    Platform.OS === "ios" ? <IosDateTimePicker date={date} onDateChange={onDateChange} /> : <AndroidDateTimePicker date={date} onDateChange={onDateChange} />;

  return (
    <View style={styles.container}>
      <TextInput style={inputStyle} placeholder="Tytuł listy" value={name} onChangeText={setName} autoFocus />
      <TextInput style={inputStyle} placeholder="Opis listy" value={description} onChangeText={setDescription} multiline />

      <View style={styles.questionContainer}>
        <Text style={styles.question}>Czy chcesz dodać datę wydarzenia?</Text>
        <Switch value={showDatePicker} onValueChange={setShowDatePicker} />
      </View>

      {showDatePicker && calendarComponent}

      <Button title="Dodaj" onPress={handleSubmit} />
      <Text style={styles.error}>{error}</Text>
    </View>
  );
}

function IosDateTimePicker({ date, onDateChange }: { date: Date; onDateChange: (selectedDate: Date | undefined) => void }) {
  const callback = (event: DateTimePickerEvent, selectedDate: Date | undefined) => {
    onDateChange(selectedDate);
  };

  return (
    <View style={iosStyles.container}>
      <Text style={iosStyles.title}>Data wydarzenia</Text>
      <DateTimePicker value={date} mode="date" display="default" onChange={callback} />
    </View>
  );
}

function AndroidDateTimePicker({ date, onDateChange }: { date: Date; onDateChange: (selectedDate: Date | undefined) => void }) {
  const colorScheme = useColorScheme();
  const inputStyle = {
    ...styles.input,
    backgroundColor: colorScheme == "dark" ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)",
  };
  const onChange = (event: DateTimePickerEvent, selectedDate: Date | undefined) => {
    onDateChange(selectedDate);
  };

  const showMode = (currentMode: string) => {
    DateTimePickerAndroid.open({
      value: date,
      onChange,
      //@ts-ignore
      mode: currentMode,
      is24Hour: true,
    });
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const showTimepicker = () => {
    showMode("time");
  };

  return (
    <View style={androidStyles.container}>
      <TouchableOpacity onPress={showDatepicker} style={[inputStyle, androidStyles.dateInput]}>
        <Text>{date ? date.toLocaleDateString() : "Wybierz datę"}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={showTimepicker} style={[inputStyle, androidStyles.timeInput]}>
        <Text>{date ? date.toTimeString().split(":").slice(0, 2).join(":") : "Wybierz godzinę"}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    padding: 15,
    marginBottom: 10,
    borderRadius: 50,
    fontSize: 20,
    borderColor: "transparent",
  },
  error: {
    color: "red",
    marginTop: 10,
  },
  questionContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
  },
  question: {
    fontSize: 16,
  },
});

const iosStyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 16,
  },
});

const androidStyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
  },
  dateInput: {
    flex: 1,
    marginRight: 5,
    textAlign: "center",
  },
  timeInput: {
    flex: 1,
    marginLeft: 5,
    textAlign: "center",
  },
});
