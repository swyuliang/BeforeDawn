using UnityEngine;
using System.Collections;

public class EffectDestroy : MonoBehaviour {
	public float life = 0.5f;
	// Use this for initialization
	void Start () {
		Destroy (gameObject, life);
	
	}
	
	// Update is called once per frame
	void Update () {
	
	}
}
