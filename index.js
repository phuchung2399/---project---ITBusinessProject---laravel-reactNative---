/**
 * @format
 */

import { Navigation } from "react-native-navigation";
import Demo from "./src/Demo";
Navigation.registerComponent('Demo', () => Demo);
Navigation.events().registerAppLaunchedListener(() => {
    Navigation.setRoot({
        root: {
            stack: {
                children: [
                    {
                        component: {
                            name: 'Demo'
                        }
                    }
                ]
            }
        }
    });
});