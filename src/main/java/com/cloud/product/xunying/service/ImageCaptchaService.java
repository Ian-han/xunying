package com.cloud.product.xunying.service;

import java.awt.Color;
import java.awt.Font;
import java.awt.Graphics;
import java.awt.image.BufferedImage;
import java.io.IOException;
import java.util.Random;

import javax.imageio.ImageIO;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

@Component("ImageCaptcha")
@Service
public class ImageCaptchaService {

	@Value("${ImageCaptcha.width}")
	private int width;

	@Value("${ImageCaptcha.height}")
	private int height;

	@Value("${ImageCaptcha.captchaLength}")
	private int captchaLength;

	@Value("${ImageCaptcha.randomString}")
	private String randomString;

	@Value("${ImageCaptcha.sessionKey}")
	private String sessionKey;

	@Value("${ImageCaptcha.font.name}")
	private String fontName;

	@Value("${ImageCaptcha.font.style}")
	private int fontStyle;

	@Value("${ImageCaptcha.font.size}")
	private int fontSize;

	private String sRand;

	public String getsRand() {
		return sRand;
	}

	public void setsRand(String sRand) {
		this.sRand = sRand;
	}

	public String getSessionKey() {
		return sessionKey;
	}

	public void setSessionKey(String sessionKey) {
		this.sessionKey = sessionKey;
	}

	Random random = null;

	public void getImage(HttpServletRequest request, HttpServletResponse response) throws IOException {

		BufferedImage image = new BufferedImage(width, height, BufferedImage.TYPE_INT_RGB);

		Graphics graphics = image.getGraphics();

		random = new Random();

		// backgroud color
		graphics.setColor(getRandColor(200, 250));
		graphics.fillRect(0, 0, width, height);
		// set font
		graphics.setFont(new Font(fontName, fontStyle, fontSize));
		graphics.setColor(getRandColor(160, 200));

		for (int i = 0; i < 155; i++) {
			int x = random.nextInt(width);
			int y = random.nextInt(height);
			int xl = random.nextInt(12);
			int yl = random.nextInt(12);
			graphics.drawLine(x, y, x + xl, y + yl);
		}

		// get random captcha
		setsRand(randomRand(captchaLength));
		int strWidth = width / 2 - graphics.getFontMetrics().stringWidth(sRand) / captchaLength - 24;
		int strHeight = height / 2 + 10;

		for (int i = 0; i < captchaLength; i++) {
			String rand = sRand.substring(i, i + 1);

			// let captcha display in the image
			graphics.setColor(new Color(20 + random.nextInt(110), 20 + random.nextInt(110), 20 + random.nextInt(110)));
			int zz = new Random().nextInt(8);
			zz = zz % 2 == 0 ? zz - 10 : zz;
			graphics.drawString(rand, strWidth - 10 + 16 * i, strHeight + zz);
		}

		request.getSession().setAttribute(sessionKey, sRand);

		response.setHeader("Pragma", "no-cache");
		response.setHeader("Cache-Control", "no-cache");
		response.setDateHeader("Expires", 0);
		response.setContentType("image/jpeg");

		ServletOutputStream soServletOutputStream = response.getOutputStream();
		ImageIO.write(image, "jpeg", soServletOutputStream);

		try {
			soServletOutputStream.flush();
		} finally {
			soServletOutputStream.close();
		}
		graphics.dispose();

		// return image;
	}

	public Color getRandColor(int fc, int bc) {
		random = new Random();
		if (fc > 255) {
			fc = 255;
		}
		if (bc > 255) {
			bc = 255;
		}

		int r = fc + random.nextInt(bc - fc);
		int g = fc + random.nextInt(bc - fc);
		int b = fc + random.nextInt(bc - fc);
		
		return new Color(r, g, b);
	}

	public String randomRand(int n) {
		String rand = "";
		int len = randomString.length();
		double r;
		for (int i = 0; i < n; i++) {
			r = (Math.random()) * len;
			rand = rand + randomString.charAt((int) r);
		}

		return rand;
	}

}
