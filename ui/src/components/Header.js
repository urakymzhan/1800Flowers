import styles from "./Header.module.css";

export default function Header() {
  return (
    <div>
      <header className={styles.header}>
        <h1>
          Posts.<span style={{ color: "#71CB86" }}>com</span>
        </h1>
        <h1>
          Cart <span style={{ color: "#71CB86" }}>(0)</span>
        </h1>
      </header>
      <div className={styles.randomLogos}>
        <div>
          <img
            src="https://images.contentstack.io/v3/assets/blt95e0138311135214/blt13b0f02cd71877df/5f08974a8b0e59084c9f7570/hd-logo-v3.svg?height=32&width=78"
            alt="logo1"
          />
        </div>
        <div>
          <img
            src="https://images.contentstack.io/v3/assets/blt95e0138311135214/bltac334446d6f9e89c/5f96fc4f2425cd7a8af6845e/pmall_svg-logo-v2.svg?height=32&width=78"
            alt="logo2"
          />
        </div>
        <div>
          <img
            src="https://images.contentstack.io/v3/assets/blt95e0138311135214/bltf0b1021465476e4f/5f08974b0d1d2008538ce15a/SharisLogo_r.svg?height=32&width=78"
            alt="logo3"
          />
        </div>
        <div>
          <img
            src="https://images.contentstack.io/v3/assets/blt95e0138311135214/bltef2e14ec247ab827/5f08974a2cd8e87f92bdd257/fb-logo-v2.svg?height=32&width=78"
            alt="logo4"
          />
        </div>
        <div>
          <img
            src="https://images.contentstack.io/v3/assets/blt95e0138311135214/bltf9903ccf2408c217/5f0897552cd8e87f92bdd25b/tpf-logo-v2.svg?height=32&width=78"
            alt="logo5"
          />
        </div>
        <div>
          <img
            src="https://images.contentstack.io/v3/assets/blt0281495b20b504a0/blta4f709f645453ff0/61b4eeeea000c90ecc6e15bd/VC_Logo_w_tag.svg?height=32&width=78"
            alt="logo6"
          />
        </div>
      </div>
    </div>
  );
}
