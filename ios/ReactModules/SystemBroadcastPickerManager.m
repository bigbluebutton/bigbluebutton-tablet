//
//  SystemBroadcastPickerManager.h
//  BigBlueButton
//
//  Here we export RPSystemBroadcastPickerView button to the react application, so we can add it on screen.
//
//  Created by Tiago Daniel Jacobs on 12/02/22.
#import <ReplayKit/ReplayKit.h>
#import <React/RCTViewManager.h>

@interface SystemBroadcastPickerManager : RCTViewManager
@end

@implementation SystemBroadcastPickerManager

RCT_EXPORT_MODULE(BBBN_SystemBroadcastPicker)

- (UIView *)view
{
  UIViewController *rootViewController = [UIApplication sharedApplication].delegate.window.rootViewController;

  RPSystemBroadcastPickerView *pickerView = [[RPSystemBroadcastPickerView alloc]initWithFrame:CGRectMake(0, 0, 16, 16)];
  
  pickerView.preferredExtension = @"org.bigbluebutton.mobile.BigBlueButton.BroadcastUpload";

  return pickerView;
}

@end
