using UnityEngine;
using System.Collections;
using System.Collections.Generic;

public class KatanaWeapon : MonoBehaviour {
	private bool isSwing ;
	public float hitDistance = 3f;         //攻击范围
	public float fireRate = 0.5f;         //设置发射频率
	private float nextFire;        //设置下次发射的时间
	public bool impactHoles = true;       //是否产生弹孔标志位
	public List<GameObject> impactObjects; //弹孔效果对象
	private float swingtime = 0.2f;
	public float damage = 20;
	public int impactForce = 10;
	private Ray ray;
	private bool isCollider;
	private RaycastHit hit; //碰撞信息
	public AudioClip Katanaswing;
	//AudioSource attackAudio;
	// Use this for initialization
	void Awake () {
		//attackAudio = GetComponent<AudioSource> ();
	
	}
	
	// Update is called once per frame
	void Update () {

		if (Input.GetButtonDown ("Fire1") && Time.time > nextFire) {
			nextFire = Time.time + fireRate;
			if (isSwing) {
				GetComponent<Animation>().Play ("MeleeSwingLeft");
				//attackAudio.Play();
				GetComponent<AudioSource>().clip = Katanaswing;
				GetComponent<AudioSource>().Play();
				isSwing = false;
			} else {
				GetComponent<Animation>().Play ("MeleeSwingRight");
				GetComponent<AudioSource>().clip = Katanaswing;
				GetComponent<AudioSource>().Play();
				//attackAudio.Play();
				isSwing = true;
			}
			StartCoroutine(Swing());
		}
	}
  
	IEnumerator Swing()
	{
		yield return new WaitForSeconds (swingtime);
		ray = Camera.main.ScreenPointToRay (Input.mousePosition);
		isCollider = Physics.Raycast (ray, out hit);
		Quaternion rotation = Quaternion.FromToRotation (Vector3.up, hit.normal);
		if (isCollider)
		if (hit.distance < hitDistance ) {
			EnemyHeatlh targetHealth = hit.collider.GetComponent<EnemyHeatlh> ();
			if (targetHealth)				//如果处在
				targetHealth.EnemyDamage (damage);
			if (hit.rigidbody) {				//如果被碰撞体上有刚体
				hit.rigidbody.AddForce (transform.forward * impactForce, ForceMode.Impulse);//对刚体施加一个力
			}
			if (impactHoles) {                 //如果弹孔对象存在
				for (int i = 0; i<impactObjects.Count; i++) { //遍历弹孔列表
					if (hit.transform.tag == impactObjects [i].tag) {//当两个标签相同
					//碰撞点实例化一个弹孔
					GameObject hole = (GameObject)Instantiate (impactObjects [i], hit.point, rotation);
					hole.transform.parent = hit.transform;//设置弹孔位置
					}
				}
			}

	
		}
	}

}
