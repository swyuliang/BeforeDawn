using UnityEngine;
using System.Collections;

public class PlayerStepSound : MonoBehaviour {
	public AudioClip[] walkSounds;//脚步声音数组
	public float walkStepLength = 0.4f;//走动时声音的播放时间
	public float runStepLength = 0.32f;//跑动时声音的播放时间
	public float crouchStepLength = 0.5f;//蹲下时声音的播放时间
	public AudioClip JumpSound;
	
	private CharacterController controller;//角色控制器
	private PlayerController motor;//玩家控制器脚本
	private float lastStep = -10.0f;//声音持续时间
	private float stepLength;//当前脚步声音持续时间
	
	void Awake () {
		stepLength = walkStepLength;//赋值
		controller = GetComponent<CharacterController>();//得到角色控制器
		motor = GetComponent<PlayerController>();//拿到玩家控制器脚本组件
	}
	
	void FixedUpdate () {
		if(motor.walking && motor.grounded && !motor.crouch) {//当角色在地面走动且没有蹲下时
			PlayStepSound();//调用播放声音方法
			stepLength = walkStepLength;//设置声音播放时间
		}
		if(motor.running && motor.grounded) {
			PlayStepSound();//调用播放声音方法
			stepLength = runStepLength;//设置声音播放时间
		}
		if(motor.walking && motor.crouch && motor.grounded) {
			PlayStepSound();//调用播放声音方法
			stepLength = crouchStepLength;//设置声音播放时间
		}
		if(Input.GetKeyDown(KeyCode.Space))
		{
			GetComponent<AudioSource>().PlayOneShot(JumpSound);
		}
	}
	
	void PlayStepSound() {
		if(Time.time > stepLength + lastStep) {//当游戏时间大于声音播放时间与持续时间之和时
            if(CameraAdaption.sound) {
                GetComponent<AudioSource>().clip = walkSounds[Random.Range(0, walkSounds.Length)];//设置声音播放片段
                GetComponent<AudioSource>().Play();//播放声音
            }			
			lastStep = Time.time;//赋值
		}
	}

}
