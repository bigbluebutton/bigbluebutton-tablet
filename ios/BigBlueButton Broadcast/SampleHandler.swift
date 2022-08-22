//
//  SampleHandler.swift
//  BigBlueButton Broadcast
//
//  Created by Tiago Daniel Jacobs on 22/08/22.
//

import ReplayKit
import bigbluebutton_tablet_sdk_broadcast_upload_extension

class SampleHandler:BBBSampleHandler{
  override func broadcastStarted(withSetupInfo setupInfo: [String : NSObject]?) {
    super.setAppGroupName(appGroupName: Constants.appGroupName)
    super.broadcastStarted(withSetupInfo: setupInfo)
  }
}
