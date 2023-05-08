import { View, Text, Image } from "react-native"
import React from "react"

const Tomorrow = ({ theme, styles }: any) => {
  return (
    <>
      <Text
        style={[
          styles.text,
          { position: "absolute", top: "30%", fontSize: 20 },
        ]}
      >
        Come back tomorrow to enter your mood again 😎
      </Text>
      {theme === "dark" ? (
        <Image
          style={{ position: "absolute", bottom: "0%" }}
          source={require("../assets/megumin.gif")}
        />
      ) : (
        <Image
          style={{ position: "absolute", bottom: "0%" }}
          source={require("../assets/megumin-light.gif")}
        />
      )}
    </>
  )
}

export default Tomorrow
