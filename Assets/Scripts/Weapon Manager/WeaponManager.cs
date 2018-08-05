using UnityEngine;
using System.Collections;

public class WeaponManager : MonoBehaviour {
	public GameObject Ak47;
	public GameObject Katana;
	public AudioClip switchAK;
	public AudioClip switchKatana;
	public float waitime = 0.5f;
	bool isAk =false;
	bool isKatana = true;
	public bool isSwitch = false; // 是否能换武器标志


	// Use this for initialization
	void Start () {
		if (isAk) {
			GetComponent<AudioSource>().clip = switchAK;
			GetComponent<AudioSource>().Play();
		}
		
		if (isKatana) {
			GetComponent<AudioSource>().clip = switchKatana;
			GetComponent<AudioSource>().Play();
		}
	
	}
	
	// Update is called once per frame
	void Update () {
		if (isSwitch) {
			if (Input.GetKeyUp (KeyCode.F)) {
				if (isAk) {
					isAk = !isAk;
					StartCoroutine (ChangeKa ());
				}

				if (isKatana) {
					isKatana = !isKatana;
					StartCoroutine (ChangeAk ());
				}

			}
		}
	
		Ak47.SetActive (isAk);
		Katana.SetActive (isKatana);
	}


	IEnumerator ChangeKa()
	{
		yield return new WaitForSeconds (waitime);
		GetComponent<AudioSource>().clip = switchKatana;
		GetComponent<AudioSource>().Play();
		isKatana = !isKatana;
	}

	IEnumerator ChangeAk()
	{
		yield return new WaitForSeconds (waitime);
		GetComponent<AudioSource>().clip = switchAK;
		GetComponent<AudioSource>().Play();
		isAk = !isAk;
	}


	
}


