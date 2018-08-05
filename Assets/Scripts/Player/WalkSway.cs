using UnityEngine;
using System.Collections;

public class WalkSway : MonoBehaviour {

	public float walkBobbingSpeed =0.21f;//行走时上下抖动的速度
	public float runBobbingSpeed = 0.35f;//跑动时上下抖动的速度
	public float idleBobbingSpeed = 0.1f;//空闲时上下抖动的速度
	public float bobbingAmount =0.1f;//抖动量
	public float smooth = 1f;//平滑移动参数
	private Vector3 midpoint ;//中心点
	private GameObject player;//玩家对象
	private float timer = 0.0f;//定时器
	private float bobbingSpeed;//抖动速度
	private PlayerController motor;//玩家控制器脚本组件
	private float BobbingAmount;//抖动大小
	// Use this for initialization
	void Awake () {
		player =GameObject.FindWithTag ("Player");//得到玩家对象
		motor = player.GetComponent<PlayerController> ();//拿到角色控制器脚本组件
		midpoint = transform.localPosition;//当前游戏对象的位置
	
	}
	
	// Update is called once per frame
	void FixedUpdate () {
		float waveslice = 0.0f;//定义变量
		float waveslice2 = 0.0f;//定义变量
		Vector3 currentPosition = Vector3.zero;//定义变量

		float tempWalkSpeed = 0f;//定义变量
		float tempRunSpeed = 0f;//定义变量
		float tempIdleSpeed = 0f;//定义变量

		if (Time.timeScale == 1) {//如果时间缩放参数等于1
			if (tempWalkSpeed != walkBobbingSpeed || tempRunSpeed != runBobbingSpeed || tempIdleSpeed != idleBobbingSpeed) {//如果满足条件
				tempWalkSpeed = walkBobbingSpeed;//赋值
				tempRunSpeed = runBobbingSpeed;
				tempIdleSpeed = idleBobbingSpeed;
			}
		} else {
			tempWalkSpeed = walkBobbingSpeed * (Time.fixedDeltaTime / 0.02f);//计算临时走动的速度
			tempRunSpeed = runBobbingSpeed * (Time.fixedDeltaTime / 0.02f);//计算临时跑动速度
			tempIdleSpeed = idleBobbingSpeed * (Time.fixedDeltaTime / 0.02f);//计算临时空闲抖动速度
		}

		waveslice = Mathf.Sin (timer * 2);
		waveslice2 = Mathf.Sin (timer);
		timer = timer + bobbingSpeed;//计算时间
		if (timer > Mathf.PI * 2) {//当变量timer大于2倍的PI时
			timer = timer - (Mathf.PI * 2);//重新计算timer
		}
		if (waveslice != 0) {//如果变量waveslice不等于零
			float tempTranslateChange = waveslice * BobbingAmount;//计算临时移动
			float tempTranslateChange2 = waveslice2 * BobbingAmount;
			float totalAxes = Mathf.Clamp (1.0f, 0.0f, 1.0f);//计算总的轴
			float translateChange = totalAxes * tempTranslateChange;//计算移动改变
			float translateChange2 = totalAxes * tempTranslateChange2;

			if (motor.grounded) {//如果角色落地
				currentPosition.y = midpoint.y + translateChange;//计算当前位置的y分量
				currentPosition.x = midpoint.x + translateChange2;//计算当前位置的x分量
			}
		} else {
			currentPosition = midpoint;//
		}

		if (motor.walking && !motor.running) {//如果角色在行走但是没有跑动
			bobbingSpeed = tempWalkSpeed;//
			BobbingAmount = bobbingAmount;
		}
		if (motor.running) {//如果角色跑动
			bobbingSpeed = tempRunSpeed;
			BobbingAmount = bobbingAmount;
		}

		if (!motor.running && !motor.walking) {//如果没有跑动且没有走动
			bobbingSpeed = tempIdleSpeed;
			BobbingAmount = bobbingAmount * .03f;//计算抖动大小
		}

		float i = 0;
		i += Time.deltaTime * smooth;//改变变量

		transform.localPosition = Vector3.Lerp (transform.localPosition, currentPosition, i);//使用线性差值平滑改变位置
	}
}
