using UnityEngine;
using UnityEngine.UI;
using System.Collections;

public class NPC_Dialog : MonoBehaviour {
	public bool isTouch =false;
	public bool isOver =false;
	public GameObject GameWin;
	public GameObject GameOver;
	public PlayerHeatlh Playerhp;
	public WeaponCrossHair wCross;
	public string NextGame;
	
	void Awake()
	{
		Playerhp = GameObject.FindGameObjectWithTag ("Player").GetComponent<PlayerHeatlh> ();
		wCross = GameObject.Find ("Weapon Camera").GetComponent<WeaponCrossHair> ();
		
	}
	// Use this for initialization
	void Start () {
		GameWin.SetActive(false);
		GameOver.SetActive(false);
	}
	
	// Update is called once per frame
	void FixedUpdate () 
	{
		if(isTouch)
			if(Input.GetKeyDown(KeyCode.E))
		{
			Touch();
		}

		if(Playerhp.currentHp <= 0)
		{
			isOver =true;
			Over ();
		}
		
		
		
	}

	void Over()
	{
		GameObject.Find ("Weapon Camera").GetComponent<WeaponCrossHair> ().enabled = false;
		GameObject.Find ("Player").GetComponent<PlayerLook> ().enabled = false;
		GameObject.Find ("HeadLook").GetComponent<PlayerLook> ().enabled = false;
		GameObject.Find ("Player").GetComponent<PlayerInput> ().enabled = false;
		
		//wCross.isShow = true;
		wCross.enabled = false;
		Cursor.visible = true;
		Screen.lockCursor = false;
		GameOver.SetActive (true);
		Debug.Log ("游戏失败");
	}
	void Touch()
	{
		/*GameObject.Find ("Weapon Camera").GetComponent<WeaponCrossHair> ().enabled =false;
		GameObject.Find ("Player").GetComponent<PlayerLook> ().enabled =false;
		GameObject.Find ("HeadLook").GetComponent<PlayerLook> ().enabled =false;
		GameObject.Find ("Player").GetComponent<PlayerInput> ().enabled =false;*/

		wCross.isShow = true ;
		wCross.enabled = false;
		//Application.LoadLevel(NextGame);
		Application.LoadLevelAsync (NextGame);
		Debug.Log ("游戏胜利");
	}
}
