using UnityEngine;
using UnityEngine.UI;
using System.Collections;

public class Loading2 : MonoBehaviour {
	public string Scenename;  //需要加载场景的名字
	public Slider progress_slider;
	public Text progress_text;
	public float waitime = 10f ;
	// Use this for initialization
	void Start () {

	
	}
	
	// Update is called once per frame
	void Update () {
		if (progress_slider.value < 1)
			progress_slider.value = Mathf.Lerp (0, 1, waitime * Time.deltaTime);
		else
			progress_slider.value = 1;

	
	}

	void Load()
	{
		progress_slider.value = Mathf.Lerp (0, 1, 10 * Time.deltaTime);
	}
}
