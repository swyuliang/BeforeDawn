using UnityEngine;
using System.Collections;

public class PlayerLook : MonoBehaviour {
	public enum RotationAxes {MouseX,MouseY}; //定义鼠标滑动轴枚举
	public RotationAxes axes = RotationAxes.MouseX;//定义鼠标滑动方向枚举型变量
	public float sensitivity = 4f;//默认操作敏感度
	public float aimSensitivity=2f;//瞄准敏感度

	[HideInInspector ]
	public float sensitivityX =15.0f;//X方向视角转动的敏感度
	[HideInInspector ]
	public float sensitivityY =15.0f;//Y方向视角转动的敏感度
	public float minY = -80f;
	public float maxY = 80f;

	[HideInInspector]
	private float inputX;//获取鼠标X轴输入
	private float inputY;//获取鼠标Y轴输入
	float rotationY =0;//竖直方向上旋转角度，和后坐力效果相关

	[HideInInspector ]
	public float currentSensitivity;//当前敏感度，用于瞄准镜；
	// Use this for initialization
	void Awake()
	{

	}

	void Start () {
	
	}
	
	// Update is called once per frame
	void Update () 
	{
		inputX =Input.GetAxisRaw("Mouse X");//获取鼠标水平滑动距离
		inputY =Input.GetAxisRaw("Mouse Y");//获取鼠标垂直滑动距离
	
		if (axes == RotationAxes.MouseX) { //当前axes变量限制为鼠标水平滑动时
			transform.Rotate (0, inputX * sensitivityY, 0);//根据鼠标的滑动转动角色
		} else if (axes == RotationAxes.MouseY) {//当axes变量限制为鼠标数值滑动时
			rotationY += inputY * sensitivityY; //得到绕Y轴转动的角度
			rotationY = Mathf.Clamp (rotationY, minY, maxY);//限制绕Y轴转动的角度范围

			transform.localEulerAngles = new Vector3 (-rotationY, transform.localEulerAngles.y, 0f);//为角色设定姿态
		}

		currentSensitivity = sensitivity;//为点前操作敏感度赋值为默认敏感度；
		sensitivityX = currentSensitivity;
		sensitivityY = currentSensitivity;
	}
	public void Recoil(float amount)
	{
		rotationY += amount; //重新计算rotationY变量
	}
}
