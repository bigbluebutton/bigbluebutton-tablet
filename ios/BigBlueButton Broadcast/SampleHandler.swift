//
//  SampleHandler.swift
//  BigBlueButtonMobileSdkBroadcastExample
//
//  Created by Tiago Daniel Jacobs on 15/02/22.
//

import ReplayKit
import bigbluebutton_mobile_sdk_broadcast_upload_extension

class SampleHandler: BBBSampleHandler {
    override func broadcastStarted(withSetupInfo setupInfo: [String : NSObject]?) {
      super.setAppGroupName(appGroupName: Constants.appGroupName)
      super.broadcastStarted(withSetupInfo: setupInfo)
    }
}
