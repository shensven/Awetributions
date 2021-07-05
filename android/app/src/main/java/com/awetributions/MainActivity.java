package com.awetributions;

import com.facebook.react.ReactActivity;
import android.content.res.Configuration;


public class MainActivity extends ReactActivity {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "Awetributions";
  }

  /**
   * get Android to react to the system theme using the React Native core API
   * The following block was added by shensven
   */  
  @Override
  public void onConfigurationChanged(Configuration newConfig) {
    super.onConfigurationChanged(newConfig);
    getReactInstanceManager().onConfigurationChanged(this, newConfig);
  }

}
