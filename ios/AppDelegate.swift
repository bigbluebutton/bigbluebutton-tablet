import UIKit
import bigbluebutton_mobile_sdk

@UIApplicationMain
class AppDelegate: UIResponder, UIApplicationDelegate, RCTBridgeDelegate {

  var window: UIWindow?
  var bridge: RCTBridge!

  func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {

    bridge = RCTBridge(delegate: self, launchOptions: launchOptions)
    let rootView = RCTRootView(bridge: bridge!, moduleName: Bundle.main.infoDictionary![kCFBundleNameKey as String] as! String, initialProperties: nil)
    
    if #available(iOS 13.0, *) {
      rootView.backgroundColor = .systemBackground
    } else {
      rootView.backgroundColor = .white
    }
    
    let rootViewController = UIViewController()
    rootViewController.view = rootView

    self.window = UIWindow(frame: UIScreen.main.bounds)
    self.window?.rootViewController = rootViewController
    self.window?.makeKeyAndVisible()
    
    BigBlueButtonSDK.start()

    return true
  }

  func sourceURL(for bridge: RCTBridge!) -> URL! {
//#if DEBUG
    return RCTBundleURLProvider.sharedSettings().jsBundleURL(forBundleRoot: "index", fallbackResource:nil)
//#else
//    let mainBundle = Bundle.main
//    return mainBundle.url(forResource: "main", withExtension: "jsbundle")!
//#endif
  }
}
