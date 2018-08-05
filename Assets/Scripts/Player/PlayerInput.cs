using UnityEngine;
using System.Collections;

[RequireComponent(typeof(PlayerController))]//此脚本所挂载的游戏对象需要有PlayerController脚本组件
public class PlayerInput : MonoBehaviour {
	private PlayerController motor ;//定义玩家控制器马达

	private Vector3 directionVector = Vector3.zero ;//角色移动方向向量
	
	// Use this for initialization
	void Awake () {
		motor = GetComponent<PlayerController> ();//拿到玩家控制器脚本组件
	}
	
	// Update is called once per frame
	void Update () {
		directionVector = new Vector3(Input.GetAxis("Horizontal"), 0, Input.GetAxis("Vertical"));//根据控制角色的前后左右键来得到角色的移动方向
		if (directionVector != Vector3.zero) {
			float directionLength = directionVector.magnitude;//计算移动方向向量的长度
			directionVector = directionVector / directionLength;//计算单位向量，这两句话相当于directionVect。normalized，但这两句话计算单位向量的规格化更快

			directionLength = Mathf.Min (1, directionLength);//确保向量长度不超过1
			//使向量到达边界值更敏感，到达中间值时更迟钝，这样使得使用操纵杆时更容易控制减速
			directionLength = directionLength * directionLength;
			//计算移动方向向量
			directionVector =directionVector * directionLength; 
		}
		motor.inputMoveDirection = transform.rotation * directionVector;//计算移动方向
		motor.inputRun = Input.GetKey (KeyCode.LeftShift);//按下左shift加速
		motor.inputJump = Input.GetKey(KeyCode.Space);//按下跳跃键跳跃
		//motor.inputCrouch = Input.GetKey (KeyCode.C);//按下C键蹲下

	}
	

}
