#pragma strict

public var mouseDownSignals : SignalSender;
public var mouseUpSignals : SignalSender;

private var state : boolean = false;

#if UNITY_WP8 || UNITY_BLACKBERRY || UNITY_TIZEN
private var joysticks : Joystick[];

function Start () {
	joysticks = FindObjectsOfType (Joystick) as Joystick[];	
}
#endif

function Update () {
#if UNITY_WP8 || UNITY_BLACKBERRY || UNITY_TIZEN
	
	if(!GLOBAL.isJSConnected)
	{
		if (state == false && joysticks[0].tapCount > 0) {
			mouseDownSignals.SendSignals (this);
			state = true;
		}
		else if (joysticks[0].tapCount <= 0) {
			mouseUpSignals.SendSignals (this);
			state = false;
		}	
	}
#else	
	if (Input.GetButtonDown("TriggerFire")) {
		mouseDownSignals.SendSignals (this);
	}
	else if(Input.GetButtonUp("TriggerFire")) {
		mouseUpSignals.SendSignals (this);
	}
#endif
}
