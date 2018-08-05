using UnityEngine;
using System.Collections;

public class GameManager : MonoBehaviour {
	public GameObject Dialog;

	public GameObject Boom;
	public GameObject particles;
	private GameObject tem;
	public GameObject[] zoom;
	public GameObject pos;
	public bool isZoom =false;
	public AudioClip DangerousSound;
	// Use this for initialization
	void Start () {
		particles.SetActive (false);
		tem = Instantiate(Dialog) as GameObject;

	
	}
	
	// Update is called once per frame
	void Update () {
		if (tem == null)
		{
			tem = Instantiate (Boom) as GameObject;
			StartCoroutine(OpenParticle());
		}
		if (isZoom) {
			zooing();
			isZoom  = false;
		}
	
	}

	IEnumerator OpenParticle()
	{
		yield return new WaitForSeconds (4f);
		particles.SetActive(true);
	}



	void zooing()
	{
		for(int i = 0 ; i < zoom.Length;i++)
			Instantiate (zoom[i], pos.transform.position, pos.transform.rotation);
		GetComponent<AudioSource>().clip = DangerousSound;
		GetComponent<AudioSource>().Play ();
	}
}
