package com.flatapp;
import android.app.Application;
import android.content.Intent;
import com.facebook.react.ReactActivity;
import com.oblador.vectoricons.VectorIconsPackage;
import io.neson.react.notification.NotificationPackage;
import com.dieam.reactnativepushnotification.ReactNativePushNotificationPackage;
import com.airbnb.android.react.maps.MapsPackage;
import com.oney.gcm.GcmPackage;
import com.microsoft.codepush.react.CodePush;
import android.content.Intent;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;


import java.util.Arrays;
import java.util.List;

public class MainActivity extends ReactActivity {
 private ReactNativePushNotificationPackage mReactNativePushNotificationPackage;
    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "FlatApp";
    }

    /**
     * Returns whether dev mode should be enabled.
     * This enables e.g. the dev menu.
     */
    @Override
    protected boolean getUseDeveloperSupport() {
        return BuildConfig.DEBUG;
    }

    /**
     * A list of packages used by the app. If the app uses additional views
     * or modules besides the default ones, add more packages here.
     */
    @Override
    protected List<ReactPackage> getPackages() {

        return Arrays.<ReactPackage>asList(
            new MainReactPackage(),
            new VectorIconsPackage(),
            new MapsPackage(),
            new GcmPackage(),
            new ReactNativePushNotificationPackage(this),
            new NotificationPackage(this),
            new CodePush(null, this, BuildConfig.DEBUG)

        );
    }
    @Override
    public void onNewIntent (Intent intent) {
      super.onNewIntent(intent);
        setIntent(intent);
    }

}
