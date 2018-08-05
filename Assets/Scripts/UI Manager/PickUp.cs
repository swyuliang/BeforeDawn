using UnityEngine;
using System.Collections;

public class PickUp : MonoBehaviour {
	public bool isTouch =false;
	public PlayerHeatlh playerhp;
	public Weapon weapon;
	public float Addhp = 50f;
	// Use this for initialization
	void Awake (){
		playerhp = GameObject.Find ("Player").GetComponent<PlayerHeatlh> ();
		weapon = GameObject.Find ("AK47").GetComponentInChildren<Weapon> ();
	}
	void Start () {
	
	}


	// Update is called once per frame
	void Update () {
	
		if(isTouch)
			if(Input.GetKeyDown(KeyCode.E))
		{
			if(gameObject.name == "Pickup_Health")
			{
				playerhp.playerAddHeatlh(Addhp);
			}
			if(gameObject.name == "Ammo_AK47")
			{
				weapon.AddBullet();
			}
			Destroy(gameObject);
		}
	}


	
}
	