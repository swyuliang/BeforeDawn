using UnityEngine;
using UnityEngine.UI;
using System.Collections;

public class EnemyHub : MonoBehaviour {
	public Slider ZomSlider; 
	public Image Hpcolor;
	public GameObject ZomSliderGameObject;
	public EnemyHeatlh enemyHeatlh;
	public GetClosetEnemy getClosetEnemy;
	public float showdistance = 15f;//显示UI的范围

	private GameObject closestEnemy;   //保存离主角最近的怪物；
	private GameObject player;
	private float distanceToClosestEnemy;
	// Use this for initialization
	void Awake () {
		ZomSliderGameObject = GameObject.Find ("ZomHp_Slider");
		ZomSlider = ZomSliderGameObject.GetComponent<Slider> ();
		Hpcolor = GameObject.Find ("Fill").GetComponent<Image> ();
		player = GameObject.Find ("Player");
		getClosetEnemy = player.GetComponent<GetClosetEnemy> ();
		HideEnemyHub ();
	}
	
	// Update is called once per frame
	void Update () {
		HideEnemyHub ();
		closestEnemy = getClosetEnemy.GetClosetZom ();
		if (closestEnemy != null) 
		{
			distanceToClosestEnemy = Vector3.Distance (closestEnemy.transform.position, player.transform.position);
			if (distanceToClosestEnemy < showdistance) 
			{
				ShowEnemyHub ();
				UpdateEnemyHub();
			}
			else
			{
				HideEnemyHub ();
			}
		}
	
	}

	void HideEnemyHub()
	{
		ZomSliderGameObject.SetActive (false);
		//Debug.Log ("隐藏");
	}

	void ShowEnemyHub()
	{
		ZomSliderGameObject.SetActive (true);
		//Debug.Log ("显示");
	}
	void UpdateEnemyHub()
	{   
		enemyHeatlh = closestEnemy.GetComponent<EnemyHeatlh> ();
		if (enemyHeatlh == null)
			return;
		ZomSlider.value = enemyHeatlh.currentHp / enemyHeatlh.maxHp;

		if (ZomSlider.value <= 0.25f)
			Hpcolor.color = Color.red;
	    else if (ZomSlider.value < 0.5f)
			Hpcolor.color = Color.yellow;
		else if (ZomSlider.value >= 0.5f)
			Hpcolor.color = Color.green;

	}
}
