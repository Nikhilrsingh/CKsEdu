import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";
import { Drawer } from "expo-router/drawer";
import { Ionicons } from "@expo/vector-icons";
import { useColorScheme } from "@/hooks/useColorScheme";

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Drawer
        screenOptions={{
          headerShown: true,
          headerTitle: '',
          drawerType: "slide",
          drawerActiveTintColor: "#4F46E5", // highlight
          drawerInactiveTintColor: "#555",
          drawerStyle: {
            backgroundColor: "#fff",
            width: 240,
          },
        }}
      >
        {/* Your existing tabs will now appear inside the Drawer */}
        <Drawer.Screen
          name="(tabs)"
          options={{
            drawerLabel: "Home",
            title: "Home",
            drawerIcon: ({ color, size }) => (
              <Ionicons name="home-outline" size={size} color={color} />
            ),
            headerShown: false, // hide header since tabs already have their own
          }}
        />
        <Drawer.Screen
          name="mentoring"
          options={{
            drawerLabel: "Mentoring",
            title: "Mentoring",
            drawerIcon: ({ color, size }) => (
              <Ionicons name="school-outline" size={size} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="aiassist"
          options={{
            drawerLabel: "AI Assist",
            title: "AI Assist",
            drawerIcon: ({ color, size }) => (
              <Ionicons name="sparkles-outline" size={size} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="elibrary"
          options={{
            drawerLabel: "E-Library",
            title: "E-Library",
            drawerIcon: ({ color, size }) => (
              <Ionicons name="library-outline" size={size} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="studentchat"
          options={{
            drawerLabel: "Student Chat",
            title: "Student Chat",
            drawerIcon: ({ color, size }) => (
              <Ionicons name="chatbubbles-outline" size={size} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="quizzes"
          options={{
            drawerLabel: "Quizzes",
            title: "Quizzes",
            drawerIcon: ({ color, size }) => (
              <Ionicons name="help-circle-outline" size={size} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="events"
          options={{
            drawerLabel: "Events",
            title: "Events",
            drawerIcon: ({ color, size }) => (
              <Ionicons name="calendar-outline" size={size} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="resources"
          options={{
            drawerLabel: "Resources",
            title: "Resources",
            drawerIcon: ({ color, size }) => (
              <Ionicons name="folder-open-outline" size={size} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="counselling"
          options={{
            drawerLabel: "Counselling",
            title: "Counselling",
            drawerIcon: ({ color, size }) => (
              <Ionicons name="heart-outline" size={size} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="leaderboard"
          options={{
            drawerLabel: "Leaderboard",
            title: "Leaderboard",
            drawerIcon: ({ color, size }) => (
              <Ionicons name="trophy-outline" size={size} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="email"
          options={{
            drawerLabel: "Email",
            title: "Email",
            drawerIcon: ({ color, size }) => (
              <Ionicons name="mail-outline" size={size} color={color} />
            ),
          }}
        />
      </Drawer>

      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
