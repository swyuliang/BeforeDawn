using UnityEngine;
using System.Collections;

public class physicWalk_MouseLook : MonoBehaviour {
	
	public static physicWalk_MouseLook instance;
	
	public Transform _camPos;
	public Vector3 camPosBasePosition;
	public Transform alternateCamPos;
	
	public enum RotationAxes { MouseXAndY = 0, MouseX = 1, MouseY = 2 }
	public RotationAxes axes = RotationAxes.MouseXAndY;
	public float sensitivity = 15f;

	public float minimumX = -360f;
	public float maximumX = 360f;

	public float minimumY = -60f;
	public float maximumY = 60f;

	public float rotationY = 0f;
	public float rotationX = 0f;
	
	public Vector2 smoothedMouse = new Vector2( 0f, 0f );
	
	public float smoothing = 4f;
	
	public bool isCamera = false;
	
	public float wobbleX = 0f;
	public float wobbleY = 0f;
	
	public float wobbleXtarget = 0f;
	public float wobbleYtarget = 0f;
	
	public float wobbleXspeed = 10f;
	public float wobbleYspeed = 10f;
	
	private float Ydirection = 1f;
	private float inputSensitivity = 0f;

	Quaternion startRotation;
	
	void Start()
	{
		if( isCamera )
		{
			instance = this;
		}
		startRotation = transform.localRotation;
		if( _camPos != null ) camPosBasePosition = _camPos.transform.localPosition;

		rotationX = transform.rotation.eulerAngles.y;
		rotationY = transform.rotation.eulerAngles.x;

		inputSensitivity += sensitivity;
		inputSensitivity *= 100f;
		if( inputSensitivity <= 0f ) inputSensitivity = 0.1f;
	}
	
	void FixedUpdate ()
	{	
		//Smoothed stuff
		smoothedMouse = Vector2.Lerp( smoothedMouse, new Vector2( Input.GetAxis( "Mouse X" ), Input.GetAxis( "Mouse Y" ) ), 1f/smoothing );
	
		//camholder stuff
		if( isCamera )
		{
			_camPos.localPosition = Vector3.Lerp( _camPos.localPosition, camPosBasePosition, Time.fixedDeltaTime * 10f );
			transform.position = Vector3.Lerp( transform.position, _camPos.position, Time.fixedDeltaTime * 5f );
			
			if( transform.localEulerAngles.y < 180f )
			{
				transform.localEulerAngles = Vector3.Lerp( transform.localEulerAngles, new Vector3( transform.localEulerAngles.x, 0f, transform.localEulerAngles.y ), Time.fixedDeltaTime * 5f );
			}
			else if( transform.localEulerAngles.y > 180f )
			{
				transform.localEulerAngles = Vector3.Lerp( transform.localEulerAngles, new Vector3( transform.localEulerAngles.x, 360f, transform.localEulerAngles.y ), Time.fixedDeltaTime * 5f );
			}
		}
		else if( isCamera && alternateCamPos != null )
		{
			transform.position = Vector3.Lerp( transform.position, alternateCamPos.position, Time.fixedDeltaTime * 10f );
			transform.rotation = Quaternion.Lerp( transform.rotation, alternateCamPos.rotation, Time.fixedDeltaTime * 10f );
		}
		

			if (axes == RotationAxes.MouseX)
			{
				rotationX += (smoothedMouse.x * inputSensitivity)*Time.deltaTime;
				//rotationX = Mathf.Clamp (rotationY, minimumY, maximumY);
				
				transform.localEulerAngles = new Vector3( transform.localEulerAngles.x, rotationX, 0f);
			}
			else
			{
				rotationY += (smoothedMouse.y * Ydirection * inputSensitivity)*Time.deltaTime;
				rotationY = Mathf.Clamp (rotationY, minimumY, maximumY);
				
				transform.localEulerAngles = new Vector3(-rotationY, transform.localEulerAngles.y, (-smoothedMouse.x * inputSensitivity)*Time.deltaTime );
			}

		
		wobbleX = Mathf.Lerp( wobbleX, wobbleXtarget, Time.fixedDeltaTime * wobbleXspeed );
		wobbleY = Mathf.Lerp( wobbleY, wobbleYtarget, Time.fixedDeltaTime * wobbleYspeed );
		
		if( wobbleXtarget > 0f ) wobbleXtarget -= Time.fixedDeltaTime * wobbleXspeed;
		if( wobbleXtarget < 0f ) wobbleXtarget += Time.fixedDeltaTime * wobbleXspeed;
		
		if( wobbleYtarget > 0f ) wobbleYtarget -= Time.fixedDeltaTime * wobbleYspeed;
		if( wobbleYtarget < 0f ) wobbleYtarget += Time.fixedDeltaTime * wobbleYspeed;
		
		Quaternion localrot = transform.localRotation;
		Vector3 euler = localrot.eulerAngles;
		
		//euler.x += Mathf.Sin( Time.timeSinceLevelLoad*speed ) * maxAmplitude * 10f * wobbleY;
		euler.x += wobbleY;
		//euler.y += Mathf.Sin( Time.timeSinceLevelLoad*speed) * maxAmplitude * wobbleX;
		
		localrot.eulerAngles = euler;
		transform.localRotation = localrot;
	}
	
	public void wobble( float _x, float _y, float _speedX, float _speedY )
	{
		wobbleX = 0f;
		wobbleY = 0f;
		
		wobbleXtarget = _x;
		wobbleYtarget = _y;
		
		wobbleXspeed = _speedX;
		wobbleYspeed = _speedY;
	}
	
}





