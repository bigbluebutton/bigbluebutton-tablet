//
//  SampleHandler.swift
//  BroadcastUpload
//
//  Created by Tiago Daniel Jacobs on 12/02/22.
//

import ReplayKit
import os

class SampleHandler: RPBroadcastSampleHandler {
  
  private var logger = os.Logger(subsystem: "SampleHandler", category: "broadcast")
  
  override func broadcastStarted(withSetupInfo setupInfo: [String : NSObject]?) {
    // User has requested to start the broadcast. Setup info from the UI extension can be supplied but optional.
    logger.info("replayKit2 event :: broadcastStarted")
  }
  
  override func broadcastPaused() {
    // User has requested to pause the broadcast. Samples will stop being delivered.
    logger.info("replayKit2 event :: broadcastPaused")
  }
  
  override func broadcastResumed() {
    // User has requested to resume the broadcast. Samples delivery will resume.
    logger.info("replayKit2 event :: broadcastResumed")
  }
  
  override func broadcastFinished() {
    // User has requested to finish the broadcast.
    logger.info("replayKit2 event :: broadcastFinished")
  }
  
  override func processSampleBuffer(_ sampleBuffer: CMSampleBuffer, with sampleBufferType: RPSampleBufferType) {
    switch sampleBufferType {
    case RPSampleBufferType.video:
      // Handle video sample buffer
      logger.trace("replayKit2 event :: processSampleBuffer (video)")
      break
    case RPSampleBufferType.audioApp:
      // Handle audio sample buffer for app audio
      logger.trace("replayKit2 event :: processSampleBuffer (system audio)")
      break
    case RPSampleBufferType.audioMic:
      // Handle audio sample buffer for mic audio
      logger.trace("replayKit2 event :: processSampleBuffer (microphone video)")
      break
    @unknown default:
      // Handle other sample buffer types
      fatalError("Unknown type of sample buffer")
    }
  }
}
