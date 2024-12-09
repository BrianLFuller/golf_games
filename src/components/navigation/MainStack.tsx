import { BaseNavigationContainer } from '@react-navigation/core';
import * as React from "react";
import { stackNavigatorFactory } from "react-nativescript-navigation";
import { AuthScreen } from "../auth/AuthScreen";
import { GameSetup } from "../game/GameSetup";
import { ScoreCard } from "../game/ScoreCard";
import { useAuth } from "../../hooks/useAuth";

const StackNavigator = stackNavigatorFactory();

export function MainStack() {
    const { currentUser } = useAuth();

    return (
        <BaseNavigationContainer>
            <StackNavigator.Navigator
                initialRouteName={currentUser ? "GameSetup" : "Auth"}
                screenOptions={{
                    headerStyle: {
                        backgroundColor: "#65adf1",
                    },
                    headerTintColor: "white",
                    headerShown: true,
                }}
            >
                {!currentUser ? (
                    <StackNavigator.Screen
                        name="Auth"
                        component={AuthScreen}
                        options={{ headerTitle: "Sign In" }}
                    />
                ) : (
                    <>
                        <StackNavigator.Screen
                            name="GameSetup"
                            component={GameSetup}
                            options={{ headerTitle: "New Game" }}
                        />
                        <StackNavigator.Screen
                            name="ScoreCard"
                            component={ScoreCard}
                            options={{ headerTitle: "Score Card" }}
                        />
                    </>
                )}
            </StackNavigator.Navigator>
        </BaseNavigationContainer>
    );
}