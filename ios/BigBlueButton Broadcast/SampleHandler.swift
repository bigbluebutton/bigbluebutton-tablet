import bigbluebutton_mobile_sdk_common

class SampleHandler: BBBSampleHandler {
  override func broadcastStarted(withSetupInfo setupInfo: [String : NSObject]?) {
    super.setAppGroupName(appGroupName: Constants.appGroupName)
    super.broadcastStarted(withSetupInfo: setupInfo)
  }
}
